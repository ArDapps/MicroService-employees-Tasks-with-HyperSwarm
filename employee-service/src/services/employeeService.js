const Employee = require("../models/employeeModel");
const { rpc } = require("../../server");

const getAllEmployees = async () => {
  return await Employee.findAll();
};

const clearEmployees = async () => {
  await Employee.destroy({ where: {} });
};

const createEmployee = async (name, position) => {
  return await Employee.create({ name, position });
};

const createTaskForEmployee = async (userId, task, taskServerPublicKey) => {
  try {
    const client = rpc.connect(Buffer.from(taskServerPublicKey, "hex"));
    const newTask = await client.request(
      "create_task",
      Buffer.from(JSON.stringify({ userId, task }))
    );
    await client.end();
    return newTask;
  } catch (error) {
    console.log(error);
    throw error; // Ensure error is re-thrown to propagate it properly
  }
};

module.exports = {
  getAllEmployees,
  clearEmployees,
  createEmployee,
  createTaskForEmployee,
};
