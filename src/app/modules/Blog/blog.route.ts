import express from 'express';
import { BlogControllers } from './blog.controller';
import { BlogValidations } from './blog.validation';
import validateRequest from '../../Middleware/validateRequest';

const router = express.Router();

router.post(
    '/',
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog
);

export const BlogRouter = router;
