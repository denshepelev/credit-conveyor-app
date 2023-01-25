import express, { Express } from 'express';
import applicationRoute from './routes/application.route.js';

const app: Express = express();

app.use(express.json());

app.use('/application', applicationRoute);

export default app;
