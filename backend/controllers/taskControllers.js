const taskModel = require("../Models/addTasks");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Project@ekahal";


const getTask = async (req, res) => {

  try {
    const taskList = await taskModel.find();
    res.status(201).json({
       taskList,
      message: "Task List successfully retrived !...",
    });
  } catch (err) {
    console.log(err);
  }
};
const createTask = async (req, res) => {
  console.log(req.body);
  const { Description, Title, DueDate } = req.body;

  try {
    const existingtask = await taskModel.findOne({ Task: Title });
    if (existingtask) {
      return res.status(400).json({ message: "Task already created" });
    }
    const Task = await taskModel.create({ TaskName: Description, Task: Title, DueDate: DueDate});
    console.log(Task);
    res.status(201).json({
      Task: Task,
      message: "Task successfully created !...",
    });
  } catch (err) {
    console.log(err);
  }
};
const updateTask = async (req, res) => {
  const { TaskName, Task } = req.body;

  try {
      const updatetask = await taskModel.findOneAndUpdate({ Task: Task }, {
          TaskName: TaskName,
    });
    res.status(201).json({
      Task: updateTask,
      message: "Task successfully updated !...",
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteTask = async (req, res) => {
  const Id  = req.body.id;
console.log(req.body.id)
console.log(Id)
  try {
     await taskModel.findOneAndDelete({ _id: Id }).then(console.log("deleted"))
    
    res.status(201).json({
      message: "Task successfully deleted !...",
    });
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
