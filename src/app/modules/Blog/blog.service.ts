/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';

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
const updateBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
    const result = await Blog.findByIdAndUpdate({ _id: id }, payload, {
        new: true
    })
        .select('_id title content author')
        .populate({ path: 'author', select: '-__v' });
    return result;
};

export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogIntoDB
};
