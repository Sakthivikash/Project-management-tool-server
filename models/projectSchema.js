import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Project", projectSchema);
