import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandle from './app/Middleware/globalErrorHandler';
import notFound from './app/Middleware/notFound';
const app: Application = express();
// const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

// applications routs
app.use('/api', router);
const test = async (req: Request, res: Response) => {
    Promise.reject();
    const a = 55;
    res.send({ a });
};

app.get('/', test);

// Error-handling middleware (should be defined to handle errors globally)
app.use(globalErrorHandle);

// not found
app.use(notFound);

export default app;
