import express from "express";
import {
  CreateNewProject,
  getAllProjects,
  deleteProjects,
  updateProject,
  deleteProjectById,
  GetProjectsByUserId,
  GetProjectsById,
} from "../Controllers/project-controller.js";

const router = express.Router();

router.post("/create-project/:id", CreateNewProject);
router.put("/update-project/:id", updateProject);
router.get("/", getAllProjects);
router.get("/user/:id", GetProjectsByUserId);
router.get("/:id", GetProjectsById);

router.delete("/del", deleteProjects);
router.delete("/del/:id", deleteProjectById);

export const projectRouter = router;
