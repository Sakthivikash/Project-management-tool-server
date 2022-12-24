import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  task: { type: String, required: true },
  prograss: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);
