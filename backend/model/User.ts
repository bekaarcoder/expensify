import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

type UserType = InferSchemaType<typeof userSchema>;

export default model<UserType>('User', userSchema);
