import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await AdminServices.blockUserFromDB(req.user, id);
    res.status(result.statusCode).json(result);
});
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await AdminServices.deleteBlogFromDB(req.user, id);
    res.status(result.statusCode).json(result);
});

export const AdminControllers = {
    blockUser,
    deleteBlog
};
