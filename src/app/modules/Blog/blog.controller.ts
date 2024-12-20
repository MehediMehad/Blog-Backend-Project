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
    const result = await BlogServices.getAllBlogsFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log('pppppppppppp', req?.user);

    const result = await BlogServices.updateBlogIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blogs is updated successfully',
        data: result
    });
});

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog
};
