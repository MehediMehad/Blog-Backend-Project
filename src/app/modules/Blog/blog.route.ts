import express from 'express';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';
import validateRequest from '../../Middleware/validateRequest';
import auth from '../../Middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog
);
router.patch(
    '/:id',
    auth(USER_ROLE.user),
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog
);
router.get('/', auth(USER_ROLE.user), BlogControllers.getAllBlogs);
router.delete(
    '/:id',
    auth(USER_ROLE.user, USER_ROLE.admin),
    BlogControllers.deleteBlog
);
export const BlogRouter = router;
