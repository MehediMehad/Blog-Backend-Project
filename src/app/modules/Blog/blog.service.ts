/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { blogSearchableFields } from './blog.constant';

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
        .select('_id title content author ')
        .populate({ path: 'author', select: '_id name email' })
        .lean(); // .lean() returns the returned data as a JavaScript object
    return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const queryObj = { ...query };

    let searchTerm = '';
    let sortBy = 'createdAt';
    let sortOrder = 'asc';

    // Handle search term
    if (query?.search) {
        searchTerm = query?.search as string;
    }

    // Handle filtering by author (convert 'filter' to 'author')
    if (queryObj.filter) {
        queryObj.author = queryObj.filter;
        delete queryObj.filter;
    }

    // Handle sorting
    if (query?.sortBy) {
        sortBy = query.sortBy as string;
    }
    if (query?.sortOrder) {
        sortOrder = (query.sortOrder as string) === 'desc' ? '-1' : '1';
    }

    // Create the base query
    const searchQuery = Blog.find({
        $or: blogSearchableFields.map(field => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    });

    // Exclude unnecessary fields
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach(el => delete queryObj[el]);

    // Apply queryObj and sorting to the searchQuery
    const result = await searchQuery
        .find(queryObj)
        .sort({ [sortBy]: sortOrder === '1' ? 1 : -1 })
        .select('_id title content author ')
        .populate({ path: 'author', select: '-__v -role -isBlocked' });

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
            .populate({ path: 'author', select: '_id name email' });

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
            err.message || 'Transaction failed. Please try again later.'
        );
    }
};

const deleteBlogFromDB = async (currentUser: JwtPayload, blogId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // Find the user by email
        const user = await User.findOne({
            email: currentUser.userEmail
        }).session(session);
        if (!user) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                'You are not authorize user.'
            );
        }

        // Find the blog by ID
        const blog = await Blog.findById({ _id: blogId }).session(session);
        if (!blog) {
            throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found.');
        }

        // Authorization check: Admins can delete any blog
        if (
            currentUser.role !== 'admin' &&
            user._id.toString() !== blog.author.toString()
        ) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You are not authorized to delete this blog.'
            );
        }

        // Delete the blog
        await Blog.findByIdAndDelete(blogId).session(session);

        // Commit the transaction
        await session.commitTransaction();
        await session.endSession();
    } catch (err: any) {
        // Rollback the transaction on error
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, `${err.message}`);
    }
};
export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB
};
