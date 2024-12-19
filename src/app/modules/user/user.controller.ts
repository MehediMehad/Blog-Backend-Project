import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Users is created successfully',
        data: result
    });
});

export const UserControllers = {
    createUser
};
