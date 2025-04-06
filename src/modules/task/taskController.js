import jwt from "jsonwebtoken";
import Task from "../../../DB/model/task.model.js";
import Category from "../../../DB/model/category.model.js";
import { AppError, catchAsyncError } from "../../../utils/error.js";

export const getTasks = catchAsyncError(async (req, res, next) => {
  const { page = 1, limit = 10, category, shared, sort } = req.query;
  let query = {};

  const { token } = req.headers;
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) throw new AppError("Invalid token", 498);
      req.user = decoded;
    });
    query.user = req.user.id;

    if (shared) {
      query.shared = shared === "true";
    }
  } else {
    query.shared = false;
  }

  if (category) {
    const categoryObj = await Category.findOne({ name: category });
    if (categoryObj) {
      query.category = categoryObj._id;
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  }

  let tasksQuery = Task.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  if (sort) {
    const sortFields = sort.split(",").join(" ");
    tasksQuery = tasksQuery.sort(sortFields);
  }

  const count = await Task.countDocuments(query);
  const tasks = await tasksQuery.populate("category").exec();
  const totalPages = Math.ceil(count / limit);

  res.json({
    currentPage: parseInt(page),
    totalPages,
    tasks,
  });
});

export const createTask = catchAsyncError(async (req, res) => {
  const { type, content, shared, category } = req.body;
  const task = await Task.create({
    type,
    content,
    shared,
    category,
    user: req.user.id,
  });
  res.status(201).json(task);
});

export const updateTask = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { type, content, shared, category } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { type, content, shared, category },
    { new: true }
  );
  if (!task) throw new AppError(`task not found`, 404);
  res.json(task);
});

export const deleteTask = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
  if (!task) throw new AppError(`task not found`, 404);
  res.status(200).json({ message: "Deleted successfully" });
});
