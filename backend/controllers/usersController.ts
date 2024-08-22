import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../model/User';
import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersController = {
    // Register
    register: asyncHandler(async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw createHttpError(400, 'User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        res.status(201).json({
            username: savedUser.username,
            email: savedUser.email,
            userId: savedUser._id,
        });
    }),
    // Login
    login: asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw createHttpError(400, 'Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw createHttpError(400, 'Invalid email or password');
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '30d',
            }
        );

        res.status(200).json({
            token: token,
            id: user._id,
            email: user.email,
            username: user.username,
        });
    }),
    // Profile
    profile: asyncHandler(async (req: Request, res: Response) => {
        const user = await User.findById(req.userId);
        if (!user) {
            throw createHttpError(404, 'User not found');
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
        });
    }),
};

export default usersController;
