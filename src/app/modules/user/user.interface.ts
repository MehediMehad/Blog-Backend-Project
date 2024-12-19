/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
    isUserBlocked(isBlocked: boolean): Promise<boolean>;
}
