import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../Middleware/validateRequest';
import { AuthValidations } from './auth.validation';
import { UserValidations } from '../User/user.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(UserValidations.createUserValidationSchema),
    AuthControllers.createUser
);
router.post(
    '/login',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser
);

export const AuthRouter = router;
