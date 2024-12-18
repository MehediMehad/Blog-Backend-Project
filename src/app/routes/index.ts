import { Router } from 'express';
import { UserRouter } from '../modules/user/user.route';

const router = Router();

const modulesRouter = [
    {
        path: '/users',
        route: UserRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
