import { Router } from 'express';
import { AuthRouter } from '../modules/Auth/auth.route';
import { BlogRouter } from '../modules/Blog/blog.route';
import { AdminRouter } from '../modules/Admin/admin.route';

const router = Router();

const modulesRouter = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/blogs',
        route: BlogRouter
    },
    {
        path: '/admin',
        route: AdminRouter
    }
];

modulesRouter.forEach(route => router.use(route.path, route.route));

export default router;
