import mongoose from "mongoose";
import Category from "../../../DB/model/category.model.js";
import { AppError, catchAsyncError } from "../../../utils/error.js";

export const getCategories = catchAsyncError(async (req, res) => {
        const categories = await Category.find({ user: req.user.id });
        if(!categories.length) throw new AppError(`You don't have any categories`,404)
        res.json(categories);
});

export const createCategory = catchAsyncError(async (req, res) => {
        const { name } = req.body;
        const category = await Category.create({ name, user: req.user.id });
        res.status(201).json(category);
});

export const updateCategory = catchAsyncError(async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findOneAndUpdate({ _id: id, user: req.user.id }, { name }, { new: true });
        if(!category) throw new AppError(`Category not found`,404)
        res.json(category);
});

export const deleteCategory = catchAsyncError(async (req, res) => {
        const { id } = req.params;
        const category = await Category.findOneAndDelete({ _id: id, user: req.user.id });
        if(!category) throw new AppError(`Category not found`,404)
        res.status(200).json({message:'Deleted successfully'})
});
