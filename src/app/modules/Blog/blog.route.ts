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
router.get('/', auth(USER_ROLE.user), BlogControllers.getAllBlogs);

export const BlogRouter = router;
