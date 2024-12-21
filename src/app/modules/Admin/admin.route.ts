import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../Middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.patch(
    '/users/:id/block',
    auth(USER_ROLE.admin),
    AdminControllers.blockUser
);
router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminControllers.deleteBlog);

export const AdminRouter = router;
