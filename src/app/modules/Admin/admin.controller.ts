import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await AdminServices.blockUserFromDB(req.user, id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User blocked successfully',
        data: result
    });
});

export const AdminControllers = {
    blockUser
};
