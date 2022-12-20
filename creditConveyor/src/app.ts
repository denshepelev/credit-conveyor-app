import express, { Express } from 'express';
import conveyorRoute from "./routes/conveyor.route.js";

const app: Express = express();

app.use(express.json());
app.use("/conveyor", conveyorRoute);

export default app;
