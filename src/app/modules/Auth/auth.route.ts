import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../Middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(UserValidation.createCourseValidationSchema),
    AuthControllers.createUser
);
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);

export const AuthRouter = router;
