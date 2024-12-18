import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();
});

// set "" after saving password
userSchema.post('save', async function (doc, next) {
    doc.password = '';
    next();
});

export const User = model<TUser>('User', userSchema);
