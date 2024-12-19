import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
    const result = await AuthServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Users is created successfully',
        data: result
    });
});

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req?.body);
    // const { refreshToken, accessToken, needsPasswordChange } = result;

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: result
    });
});

export const AuthControllers = {
    createUser,
    loginUser
};
