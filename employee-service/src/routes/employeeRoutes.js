const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Define routes and link them to controller methods
router.get("/all", employeeController.getAllEmployees);
router.delete("/clear", employeeController.clearEmployees);
router.post("/create", employeeController.createEmployee);
router.post("/task", employeeController.createTaskForEmployee);

module.exports = router;
