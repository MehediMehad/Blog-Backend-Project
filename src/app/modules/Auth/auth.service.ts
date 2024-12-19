import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUserIntoDB = async (payload: TUser) => {
    // Ensure the role is set to 'user' by default
    payload.role = 'user';

    const user = await User.create(payload);

    // Query to return specific fields (_id, name, email) without password
    const result = await User.findById(user._id)
        .select('_id name email')
        .lean(); // .lean() returns the returned data as a JavaScript object
    return result;
};

export const AuthServices = {
    createUserIntoDB
};
