const Task = require("../models/taskModel");

const createTask = async (userId, task) => {
  await Task.create({ userId, task });
};

module.exports = {
  createTask,
};
