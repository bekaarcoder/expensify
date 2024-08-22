import express from 'express';
import usersController from '../controllers/usersController';
import {
    loginBodyValidator,
    registrationBodyValidator,
    validate,
} from '../middlewares/validator';
import isAuthenticated from '../middlewares/isAuth';

const userRouter = express.Router();

userRouter.post(
    '/register',
    registrationBodyValidator,
    validate,
    usersController.register
);

userRouter.post('/login', loginBodyValidator, validate, usersController.login);

userRouter.get('/profile', isAuthenticated, usersController.profile);

export default userRouter;
