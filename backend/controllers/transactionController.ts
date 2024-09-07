import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Transaction from '../model/Transaction';
import createHttpError from 'http-errors';

interface TransactionFilter {
    date?: {
        $gte?: Date;
        $lte?: Date;
    };
    type?: string;
    category?: string;
    user: string;
}

const transactionController = {
    // Add
    create: asyncHandler(async (req: Request, res: Response) => {
        const { type, category, amount, date, description } = req.body;
        const transaction = await Transaction.create({
            user: req.userId,
            type: type,
            category: category,
            amount: amount,
            date: date ? date : undefined,
            description: description,
        });

        res.status(201).json(transaction);
    }),
    // lists
    // filtered transactions
    lists: asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate, type, category } = req.query;

        let filters: TransactionFilter = { user: req.userId };
        if (typeof startDate === 'string' && startDate !== '') {
            filters.date = { ...filters.date, $gte: new Date(startDate) };
        }
        if (typeof endDate === 'string' && endDate !== '') {
            filters.date = { ...filters.date, $lte: new Date(endDate) };
        }
        if (typeof type === 'string' && type !== '') {
            filters.type = type;
        }
        if (typeof category === 'string' && category !== '') {
            if (category !== 'All') {
                let transactionCategory =
                    category === 'Uncategorized' ? 'Uncategorized' : category;
                filters.category = transactionCategory;
            }
        }
        const transactions = await Transaction.find(filters).sort({
            date: -1,
        });
        res.status(200).json(transactions);
    }),
    // update
    update: asyncHandler(async (req: Request, res: Response) => {
        const transaction = await Transaction.findById(req.params.id);
        if (
            transaction &&
            transaction.user.toString() === req.userId.toString()
        ) {
            transaction.type = req.body.type || transaction.type;
            transaction.category = req.body.category || transaction.category;
            transaction.amount = req.body.amount || transaction.amount;
            transaction.date = req.body.date || transaction.date;
            transaction.description =
                req.body.description || transaction.description;

            const updatedTransaction = await transaction.save();
            res.status(200).json(updatedTransaction);
        } else {
            throw createHttpError(404, 'Transaction not found');
        }
    }),
    // delete
    delete: asyncHandler(async (req: Request, res: Response) => {
        const transaction = await Transaction.findById(req.params.id);
        if (
            transaction &&
            transaction.user.toString() === req.userId.toString()
        ) {
            await transaction.deleteOne();
            res.status(200).json({
                message: 'Transaction deleted successfully',
            });
        } else {
            throw createHttpError(404, 'Transaction not found');
        }
    }),
};

export default transactionController;
