const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    stage: {
      type: Number,
      required: true,
    },
    priorityValue: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

//module.exports = mongoose.model("task", taskSchema);
module.exports = mongoose.models.task || mongoose.model("task", taskSchema);
