/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

const createBlogIntoDB = async (currentUser: JwtPayload, payload: TBlog) => {
    const currentUserId = await User.findOne({
        email: currentUser?.userEmail
    }).select('_id');

    // If the user is not found, throw an error to prevent proceeding
    if (!currentUserId) {
        throw new Error('User not found');
    }
    // Assign the current user's ID to the author field in the blog payload
    payload.author = currentUserId._id;

    const blog = await Blog.create(payload);
    const result = await Blog.findById(blog._id)
        .select('_id title content author')
        .populate('author') // TODO :
        .lean(); // .lean() returns the returned data as a JavaScript object
    return result;
};

const getAllBlogsFromDB = async () => {
    const result = await Blog.find()
        .select('_id title content author')
        .populate({ path: 'author', select: '-__v' });
    return result;
};
const updateBlogIntoDB = async (
    currentUser: JwtPayload,
    id: string,
    payload: Partial<TBlog>
) => {
    const session = await Blog.startSession();
    session.startTransaction();

    try {
        // Find the user
        const user = await User.findOne({
            email: currentUser.userEmail
        }).session(session);
        if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User not found.');
        }

        // Find the blog
        const blog = await Blog.findById({ _id: id }).session(session);
        if (!blog) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found.');
        }

        // Check authorization
        if (user._id.toString() !== blog.author.toString()) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You are not authorized to update this blog.'
            );
        }

        // Update the blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            { _id: id },
            payload,
            { new: true, session } // Include session for transaction
        )
            .select('_id title content author')
            .populate({ path: 'author', select: '-__v' });

        if (!updatedBlog) {
            throw new AppError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                'Failed to update the blog.'
            );
        }

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();

        return updatedBlog;
    } catch (err: any) {
        // Rollback the transaction on error
        await session.abortTransaction();
        session.endSession();
        throw new AppError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Transaction failed. Please try again later.'
        );
    }
};

export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogIntoDB
};
