import express from "express";
import {
  Signup,
  Login,
  deleteUser,
  updateUser,
  getUser,
} from "../Controllers/user-controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.delete("/del", deleteUser);
router.get("/:id", getUser);
router.put("/update/:id", updateUser);

export const userRouter = router;
