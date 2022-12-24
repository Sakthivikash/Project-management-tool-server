import express from "express";
import {
  CreateNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
  deleteTasks,
  GetTasksByProjects,
  GetTasksByProjectToDo,
  GetTasksByProjectInPrograss,
  GetTasksByProjectDone,
} from "../Controllers/task-controller.js";

const router = express.Router();

router.post("/create-task/:id", CreateNewTask);
router.put("/update-task/:id", updateTask);
router.get("/", getAllTasks);
router.get("/:id", GetTasksByProjects);
router.get("/to-do/:id", GetTasksByProjectToDo);
router.get("/in-prograss/:id", GetTasksByProjectInPrograss);
router.get("/done/:id", GetTasksByProjectDone);
router.delete("/del/:id", deleteTask);
router.delete("/del", deleteTasks);

export const taskRouter = router;
