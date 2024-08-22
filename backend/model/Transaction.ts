import { InferSchemaType, model, Schema } from 'mongoose';

const transactionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['income', 'expense'],
        },
        category: {
            type: String,
            required: true,
            default: 'Uncategorized',
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

type TransactionType = InferSchemaType<typeof transactionSchema>;

export default model<TransactionType>('Transaction', transactionSchema);
