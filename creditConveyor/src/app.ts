import express, { Express } from 'express';
import conveyorRoute from './routes/conveyor.route.js';
import swaggerUi from 'swagger-ui-express';
import { apiDocumentation } from './docs/apidoc.js';

const app: Express = express();

app.use(express.json());

app.use('/conveyor', conveyorRoute);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

export default app;
