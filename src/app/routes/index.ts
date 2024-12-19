import { Router } from 'express';
import { AuthRouter } from '../modules/Auth/auth.route';
import { BlogRouter } from '../modules/Blog/blog.route';
import { UserRouter } from '../modules/User/user.route';

const router = Router();

const modulesRouter = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
