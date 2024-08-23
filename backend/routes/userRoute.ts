import express from 'express';
import usersController from '../controllers/usersController';
import {
    changePasswordValidator,
    loginBodyValidator,
    registrationBodyValidator,
    updateProfileValidator,
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

userRouter.put(
    '/change-password',
    changePasswordValidator,
    validate,
    isAuthenticated,
    usersController.changeUserPassword
);

userRouter.put(
    '/update-profile',
    updateProfileValidator,
    validate,
    isAuthenticated,
    usersController.updateUserProfile
);

export default userRouter;
