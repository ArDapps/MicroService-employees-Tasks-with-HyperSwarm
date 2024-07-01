const Employee = require("../models/employeeModel");
const { rpc } = require("../../server");
const taskServerPublicKey = "PUBLIC_KEY_OF_TASK_SERVER"; // Replace with the actual public key

const getAllEmployees = async () => {
  return await Employee.findAll();
};

const clearEmployees = async () => {
  await Employee.destroy({ where: {} });
};

const createEmployee = async (name, position) => {
  return await Employee.create({ name, position });
};

const createTaskForEmployee = async (userId, task) => {
  const client = rpc.connect(taskServerPublicKey);
  const newTask = await client.request(
    "createTask",
    Buffer.from(JSON.stringify({ userId, task }))
  );
  await client.end();
  return newTask;
};

module.exports = {
  getAllEmployees,
  clearEmployees,
  createEmployee,
  createTaskForEmployee,
};
