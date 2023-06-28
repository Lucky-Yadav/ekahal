const express = require("express");;
const { createTask, updateTask, deleteTask, getTask } = require("../controllers/taskControllers");
const taskRouter = express.Router();

taskRouter.get("/tasks", getTask);
taskRouter.post("/tasks", createTask);
taskRouter.patch("/tasks", updateTask);
taskRouter.delete("/tasks", deleteTask);

module.exports = taskRouter;
