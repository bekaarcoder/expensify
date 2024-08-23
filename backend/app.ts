import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute';
import createHttpError, { isHttpError } from 'http-errors';
import categoryRouter from './routes/categoryRoute';

const app = express();

// Connect to mongodb
mongoose
    .connect('mongodb://localhost:27017/mern-expenses')
    .then(() => console.log('Database connected'))
    .catch((e) => console.log(`Error connecting database: ${e}`));

app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/category', categoryRouter);

app.get('/test', (req, res) => {
    res.send('Node Server Working!');
});

app.use((req, res, next) => {
    next(createHttpError(404, 'API not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = 'An unknow error occurred';
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
