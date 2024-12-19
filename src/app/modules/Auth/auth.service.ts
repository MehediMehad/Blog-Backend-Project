import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
    // Ensure the role is set to 'user' by default
    payload.role = 'user';

    const user = await User.create(payload);

    // Query to return specific fields (_id, name, email) without password
    const result = await User.findById(user._id).select('_id name email'); // .lean() returns the returned data as a JavaScript object
    return result;
};
const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload.email);

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found');
    }
    // checking if the user is Blocked
    await User.isUserBlocked(user.isBlocked);

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched!');
    }

    // create token and send to the client
    const jwtPayload = {
        userId: user.email,
        role: user.role
    };

    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {
            expiresIn: '30d'
        }
    );

    return { token: accessToken };
};

export const AuthServices = {
    createUserIntoDB,
    loginUser
};
