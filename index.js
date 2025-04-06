import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./DB/db.con.js";
import userRoutes from "./src/modules/user/user.routes.js";
import categoryRoutes from "./src/modules/category/category.routes.js";
import taskRoutes from "./src/modules/task/task.routes.js";
import { AppError } from "./utils/error.js";
process.on("uncaughtException", () => console.log("error"));
dotenv.config({ path: path.resolve("./config/.env") });
//create server
const app = express();
const port = +process.env.PORT || 3001;
//connect to db
connectDB();
//parse req
app.use(express.json());

app.use("/user", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/tasks", taskRoutes);

app.use("*", (req, res, next) => {
  next(new AppError(req.originalUrl + " not found", 404));
});
app.use((err, req, res, next) => {
  const { message, statusCode } = err;
  res.status(statusCode || 500).json({ message });
});

//listen server
app.listen(port, () => {
  console.log("server is running on port", port);
});
process.on("uncaughtException", () => console.log("error"));
