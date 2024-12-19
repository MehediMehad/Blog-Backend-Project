import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../Middleware/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(UserValidation.createUserValidationSchema),
    AuthControllers.createUser
);
router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);

export const AuthRouter = router;
