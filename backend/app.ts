import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoute';
import createHttpError, { isHttpError } from 'http-errors';
import categoryRouter from './routes/categoryRoute';
import transactionRouter from './routes/transactionRoute';

const app = express();

// Connect to mongodb
mongoose
    .connect('mongodb://localhost:27017/mern-expenses')
    .then(() => console.log('Database connected'))
    .catch((e) => console.log(`Error connecting database: ${e}`));

// cors config
const corsOptions = {
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/transaction', transactionRouter);

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
