const { sequelize, rpc, dht, employeeServerKey } = require("../../server");
const Task = require("../models/taskModel");

const checkUserExists = async (userId) => {
  const client = rpc.connect(employeeServerKey);
  const userExists = await client.request("checkUser", Buffer.from(userId));
  await client.end();
  return userExists;
};

const createTask = async (userId, task) => {
  await Task.create({ userId, task });
};

module.exports = {
  checkUserExists,
  createTask,
};
