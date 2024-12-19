import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payload: TUser) => {
    // Ensure the role is set to 'user' by default
    payload.role = 'user';

    const result = await User.create(payload);
    return result;
};

export const AuthServices = {
    createUserIntoDB
};
