const employeeService = require("../services/employeeService");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const clearEmployees = async (req, res) => {
  try {
    await employeeService.clearEmployees();
    res.send("Employees cleared");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, position } = req.body;
    const newEmployee = await employeeService.createEmployee(name, position);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTaskForEmployee = async (req, res) => {
  try {
    const { userId, task, taskServerPublicKey } = req.body;
    const newTask = await employeeService.createTaskForEmployee(
      userId,
      task,
      taskServerPublicKey
    );
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEmployees,
  clearEmployees,
  createEmployee,
  createTaskForEmployee,
};
