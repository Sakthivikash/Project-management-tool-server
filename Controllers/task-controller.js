import mongoose from "mongoose";
import Project from "../models/projectSchema.js";
import Task from "../models/taskSchema.js";

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({});
    res.send({ tasks: tasks });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTasks(req, res) {
  const tasks = await Task.deleteMany({});
  res.send("deleted");
}
export async function CreateNewTask(req, res) {
  const _id = req.params.id;
  let project;
  try {
    project = await Project.findById(_id);
  } catch (err) {
    return console.log(err);
  }
  if (!project) {
    return res
      .status(400)
      .json({ message: "Could not find the project by this ID" });
  }
  try {
    const newTask = new Task({
      projectId: _id,
      task: req.body.task,
      prograss: req.body.prograss,
    });
    try {
      await newTask.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }

    return res.status(200).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error);
  }
}

//Update Task:
export async function updateTask(req, res) {
  const _id = req.params.id;
  const { task, prograss } = req.body;

  try {
    let taskUpdate = await Task.findByIdAndUpdate(
      { _id },
      { $set: { task, prograss } }
    );
    return res
      .status(200)
      .json({ message: "Updated successfully", task: taskUpdate });
  } catch (error) {
    console.log(error);
  }
}

//Delete task:
export async function deleteTask(req, res) {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}

//Get tasks by the particuar project:
export async function GetTasksByProjects(req, res) {
  const id = req.params.id;
  try {
    const tasks = await Task.find({ projectId: id });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
  }
}

export async function GetTasksByProjectToDo(req, res) {
  const id = req.params.id;
  try {
    const tasks = await Task.find({
      projectId: { $eq: id },

      prograss: { $eq: "To-Do" },
    });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
  }
}
export async function GetTasksByProjectInPrograss(req, res) {
  const id = req.params.id;
  try {
    const tasks = await Task.find({
      $and: [{ projectId: { $eq: id } }, { prograss: { $eq: "In-Prograss" } }],
    });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
  }
}
export async function GetTasksByProjectDone(req, res) {
  const id = req.params.id;
  try {
    const tasks = await Task.find({
      $and: [{ projectId: { $eq: id } }, { prograss: { $eq: "Done" } }],
    });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
  }
}
