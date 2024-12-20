import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { BlogServices } from './blog.service';

const createBlog: RequestHandler = catchAsync(async (req, res) => {
    const result = await BlogServices.createBlogIntoDB(req.user, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogsFromDB(req?.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BlogServices.updateBlogIntoDB(req.user, id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blogs is updated successfully',
        data: result
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const currentUser = req.user;

    const result = await BlogServices.deleteBlogFromDB(currentUser, id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result
    });
});

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
};
