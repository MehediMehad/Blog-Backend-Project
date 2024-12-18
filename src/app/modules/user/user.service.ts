import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
    // Ensure the role is set to 'user' by default
    payload.role = 'user'; // Overwrite or set the role field

    const result = await User.create(payload);
    return result;
};

export const UserServices = {
    createUserIntoDB
};
