const express = require("express");
const DHT = require("hyperdht");
const RPC = require("@hyperswarm/rpc");
const { sequelize } = require("./src/config/database");
const taskRoutes = require("./src/routes/taskRoutes");
const { createTask } = require("./src/models/taskModel");

const app = express();
const PORT = process.env.PORT || 3001;

// إعداد HyperDHT
const dht = new DHT();
const keyPair = DHT.keyPair();

// إعداد RPC
const rpc = new RPC({ dht });
const server = rpc.createServer();

server.on("request", async (req, res) => {
  if (req.method === "create_task") {
    const { userId, task } = JSON.parse(req.value.toString());
    await createTask(userId, task);
    res.end({ success: true });
  } else {
    res.end({ error: "Unknown method" });
  }
});

server.listen(keyPair);

console.log(
  `Task Service RPC server is running with public key: ${keyPair.publicKey.toString(
    "hex"
  )}`
);

// بدء تشغيل خادم Express
app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Task Service is running on port ${PORT}`);
});

module.exports = { keyPair };
