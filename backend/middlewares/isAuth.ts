import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const headerObj = req.headers;
    const token =
        headerObj?.authorization?.startsWith('Bearer') &&
        headerObj?.authorization?.split(' ')[1];

    if (!token) {
        throw createHttpError(401, 'Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        if (decoded && typeof decoded !== 'string') {
            req.userId = decoded.id;
            next();
        } else {
            throw createHttpError(401, 'Unauthorized');
        }
    } catch (error) {
        const err = createHttpError(401, 'Invalid token, login again');
        next(err);
    }
};

export default isAuthenticated;
