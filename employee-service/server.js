const express = require("express");
const DHT = require("hyperdht");
const RPC = require("@hyperswarm/rpc");
const { sequelize } = require("./src/config/database");
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد HyperDHT
const dht = new DHT();
const rpc = new RPC({ dht });

app.use(express.json());
app.use("/employees", employeeRoutes);

app.listen(PORT, async () => {
  await sequelize.sync();
  console.log(`Employee Service is running on port ${PORT}`);
});

module.exports = { rpc };
