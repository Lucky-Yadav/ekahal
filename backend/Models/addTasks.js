const mongoose = require("mongoose")

const TasksSchema = mongoose.Schema(
  {
    TaskName: {
      type: String,
      required: true,
    },
    Task: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", TasksSchema);
