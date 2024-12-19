import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../Middleware/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(UserValidation.createCourseValidationSchema),
    AuthControllers.createUser
);

export const AuthRouter = router;
