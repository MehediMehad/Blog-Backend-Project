import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandle from './app/Middleware/globalErrorHandler';
import notFound from './app/Middleware/notFound';
import config from './app/config';
const app: Application = express();
// const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

// applications routs
app.use('/api', router);
const test = async (req: Request, res: Response) => {
    Promise.reject();
    res.send(`The bicycle is moving at a speed of ${config.port} 🚴`);
};

app.get('/', test);

// Error-handling middleware (should be defined to handle errors globally)
app.use(globalErrorHandle);

// not found
app.use(notFound);

export default app;
