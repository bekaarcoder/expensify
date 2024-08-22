import { InferSchemaType, model, Schema } from 'mongoose';

const categorySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            default: 'Uncategorized',
        },
        type: {
            type: String,
            required: true,
            enum: ['income', 'expense'],
        },
    },
    {
        timestamps: true,
    }
);

type CategoryType = InferSchemaType<typeof categorySchema>;

export default model<CategoryType>('Category', categorySchema);
