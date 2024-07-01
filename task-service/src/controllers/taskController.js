const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const { userId, task } = req.body;
    await taskService.createTask(userId, task);
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
};
