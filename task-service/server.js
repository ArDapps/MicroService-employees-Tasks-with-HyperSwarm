const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");
const { sequelize } = require("./src/config/database");
const RPC = require("@hyperswarm/rpc");

const app = express();
const port = 3001;

const rpc = new RPC();
const server = rpc.createServer();
server.listen();

server.respond("createTask", async (req) => {
  const { userId, task } = JSON.parse(req.toString());
  const Task = require("./src/models/taskModel");
  const newTask = await Task.create({ userId, task });
  return newTask;
});

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Task Service listening at http://localhost:${port}`);
});

module.exports = { sequelize, rpc, server };
