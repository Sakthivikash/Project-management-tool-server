import mongoose from "mongoose";
import Project from "../models/projectSchema.js";
import User from "../models/user-schema.js";
import Task from "../models/taskSchema.js";

export async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({});
    res.send({ projects: projects });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProjects(req, res) {
  try {
    await Project.deleteMany({});
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
}
export async function CreateNewProject(req, res) {
  const { title, desc } = req.body;
  const _id = req.params.id;
  let existingUser;
  try {
    existingUser = await User.findById(_id);
    console.log(existingUser);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Could not find the user by this ID" });
  }
  try {
    const newProject = new Project({
      title,
      desc,
      userId: _id,
    });
    try {
      await newProject.save();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }

    return res.status(200).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.log(error);
  }
}

//Get project created by the particular user
export async function GetProjectsByUserId(req, res) {
  const id = req.params.id;
  try {
    const projects = await Project.find({ userId: id });
    console.log(projects);
    return res.json({ projects });
  } catch (error) {
    console.log(error);
  }
}

//Get project by id:
export async function GetProjectsById(req, res) {
  const id = req.params.id;
  try {
    const project = await Project.findOne({ _id: id });
    return res.json({ project });
  } catch (error) {
    console.log(error);
  }
}

//Update project:
export async function updateProject(req, res) {
  const id = req.params.id;
  const { title, desc } = req.body;
  try {
    let project = await Project.findByIdAndUpdate(
      { _id: id },
      { $set: { title, desc } }
    );
    const getProject = await Project.findById({ _id: id });
    // project = await Project.findByIdAndUpdate(id, { title, desc });
    return res
      .status(200)
      .json({ message: "Updated successfully", getProject });
  } catch (error) {
    console.log(error);
  }
}

//Delete project:
export async function deleteProjectById(req, res) {
  const _id = req.params.id;
  try {
    try {
      await Task.find({ projectId: id }).deleteMany({});
      console.log("Tasks are deleted");
    } catch (error) {
      console.log(error);
    }

    await Project.findByIdAndDelete({ _id });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}
