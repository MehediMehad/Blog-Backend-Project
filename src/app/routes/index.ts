import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AuthRouter } from '../modules/Auth/auth.route';

const router = Router();

const modulesRouter = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
