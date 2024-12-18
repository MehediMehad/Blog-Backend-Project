import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: [true, 'Name id is required']
        },
        email: {
            type: String,
            required: [true, 'Email id is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password id is required']
        },
        role: {
            type: String,
            enum: {
                values: ['admin', 'user'],
                message: '{VALUE} is not a valid user role.'
            },
            required: [true, 'role is required.']
        }
    },
    {
        timestamps: true
    }
);

export const User = model<TUser>('User', userSchema);
