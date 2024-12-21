/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';

const blockUserFromDB = async (currentUser: JwtPayload, id: string) => {
    const session = await User.startSession();
    session.startTransaction();

    try {
        // Check if the current user is an admin
        if (currentUser.role !== 'admin') {
            throw new AppError(
                StatusCodes.FORBIDDEN,
                'Only admins can block users.'
            );
        }

        // Find the user to block
        const user = await User.findById(id).session(session);
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User not found.');
        }
        if (user.role === 'admin') {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                'Admins cannot block other admins. Only super admins can.'
            );
        }

        // Update the isBlocked property
        user.isBlocked = true;

        // Avoid triggering the pre-save hook for password hashing
        const updatedUser = await User.updateOne(
            { _id: id },
            { isBlocked: true },
            { session }
        );

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        return updatedUser;
    } catch (err: any) {
        // Rollback the transaction on error
        await session.abortTransaction();
        session.endSession();
        throw new AppError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            err.message || 'Transaction failed. Please try again later.'
        );
    }
};

export const AdminServices = {
    blockUserFromDB
};
