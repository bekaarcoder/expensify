import express from 'express';
import isAuthenticated from '../middlewares/isAuth';
import { createCategoryValidator, validate } from '../middlewares/validator';
import categoryController from '../controllers/categoryController';

const categoryRouter = express.Router();

categoryRouter.post(
    '/create',
    isAuthenticated,
    createCategoryValidator,
    validate,
    categoryController.create
);

categoryRouter.get('/lists', isAuthenticated, categoryController.lists);

categoryRouter.put(
    '/update/:categoryId',
    isAuthenticated,
    createCategoryValidator,
    validate,
    categoryController.update
);

categoryRouter.delete(
    '/delete/:categoryId',
    isAuthenticated,
    categoryController.delete
);

export default categoryRouter;
