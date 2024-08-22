import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import createHttpError from 'http-errors';

export const registrationBodyValidator = [
    check('username').trim().notEmpty().withMessage('Username is required'),
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
];

export const loginBodyValidator = [
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid'),
    check('password').trim().notEmpty().withMessage('Password is required'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).array();
    if (error.length) {
        throw createHttpError(400, error[0].msg);
    }
    next();
};
