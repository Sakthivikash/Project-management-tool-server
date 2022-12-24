import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./Routes/user-router.js";
import { projectRouter } from "./Routes/project-router.js";
import cors from "cors";
import { taskRouter } from "./Routes/task-router.js";

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/user", userRouter);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

const Port = process.env.PORT;
const DB_Url = process.env.MONGO_URL;
mongoose.connect(DB_Url, (err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(Port, () => {
      console.log(`Server is running on ${Port}`);
    });
  }
});
