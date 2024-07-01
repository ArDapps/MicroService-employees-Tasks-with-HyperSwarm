const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/", employeeController.getAllEmployees);
router.delete("/", employeeController.clearEmployees);
router.post("/", employeeController.createEmployee);
router.post("/task", employeeController.createTaskForEmployee);

module.exports = router;
