import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-users', UserControllers.createUser);

export const UserRouter = router;
