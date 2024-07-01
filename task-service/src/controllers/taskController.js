const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  const { userId, task } = req.body;
  try {
    const userExists = await taskService.checkUserExists(userId);
    if (userExists) {
      await taskService.createTask(userId, task);
      res.send("Task created");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTask,
};
