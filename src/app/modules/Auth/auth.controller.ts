import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
    });
});

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req?.body);
    // const { refreshToken, accessToken, needsPasswordChange } = result;

    sendResponse(res, {
        success: true,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        data: result
    });
});

export const AuthControllers = {
    registerUser,
    loginUser
};
