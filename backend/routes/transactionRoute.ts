import express from 'express';
import isAuthenticated from '../middlewares/isAuth';
import transactionController from '../controllers/transactionController';
import { createTransactionValidator, validate } from '../middlewares/validator';

const transactionRouter = express.Router();

transactionRouter.post(
    '/create',
    isAuthenticated,
    createTransactionValidator,
    validate,
    transactionController.create
);

transactionRouter.get('/lists', isAuthenticated, transactionController.lists);

transactionRouter.put(
    '/update/:id',
    isAuthenticated,
    transactionController.update
);

transactionRouter.delete(
    '/delete/:id',
    isAuthenticated,
    transactionController.delete
);

export default transactionRouter;
