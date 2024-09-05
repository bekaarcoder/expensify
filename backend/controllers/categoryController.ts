import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../model/Category';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Transaction from '../model/Transaction';
const categoryController = {
    // Add
    create: asyncHandler(async (req: Request, res: Response) => {
        const { name, type } = req.body;

        const normalizedName = name.toLowerCase();

        // check if category exist for user
        const categoryExist = await Category.findOne({
            name: normalizedName,
            user: req.userId,
        });
        if (categoryExist) {
            throw createHttpError(
                400,
                `Category ${categoryExist.name} already exists`
            );
        }

        const category = await Category.create({
            name: normalizedName,
            user: req.userId,
            type: type,
        });

        res.status(201).json(category);
    }),
    // List
    lists: asyncHandler(async (req: Request, res: Response) => {
        const categories = await Category.find({ user: req.userId });
        res.status(200).json(categories);
    }),
    // Update
    update: asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = req.params;

        if (!mongoose.isValidObjectId(categoryId)) {
            throw createHttpError(404, 'Invalid category Id');
        }

        const { name, type } = req.body;
        const normalizedName = name.toLowerCase();

        const categoryExist = await Category.findOne({
            user: req.userId,
            _id: categoryId,
        });
        if (!categoryExist) {
            throw createHttpError(404, 'Category not found');
        }

        const oldCategory = categoryExist.name;

        const categories = await Category.find({ user: req.userId });
        const remainingCategory = categories.filter(
            (category) => !category._id.equals(categoryId)
        );

        remainingCategory.forEach((category) => {
            if (category.name === normalizedName) {
                throw createHttpError(
                    400,
                    `Category ${normalizedName} already exists`
                );
            }
        });

        categoryExist.name = normalizedName;
        categoryExist.type = type;

        const updatedCategory = await categoryExist.save();

        // Update transactions category
        await Transaction.updateMany(
            {
                user: req.userId,
                category: oldCategory,
            },
            {
                $set: {
                    category: updatedCategory.name,
                },
            }
        );

        res.status(200).json(updatedCategory);
    }),
    // Delete
    delete: asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = req.params;

        if (!mongoose.isValidObjectId(categoryId)) {
            throw createHttpError(404, 'Invalid category Id');
        }

        const categoryExist = await Category.findOne({
            user: req.userId,
            _id: categoryId,
        });
        if (!categoryExist) {
            throw createHttpError(404, 'Category not found');
        }

        // Update transactions category
        await Transaction.updateMany(
            {
                user: req.userId,
                category: categoryExist.name,
            },
            {
                $set: {
                    category: 'Uncategorized',
                },
            }
        );

        await categoryExist.deleteOne();

        res.status(204).json({ message: 'Category deleted successfully' });
    }),
    // get Category
    get: asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = req.params;

        if (!mongoose.isValidObjectId(categoryId)) {
            throw createHttpError(404, 'Invalid category Id');
        }

        const categoryExist = await Category.findOne({
            user: req.userId,
            _id: categoryId,
        });
        if (!categoryExist) {
            throw createHttpError(404, 'Category not found');
        }

        res.status(200).json(categoryExist);
    }),
};

export default categoryController;
