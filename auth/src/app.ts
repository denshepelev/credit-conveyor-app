import express, { Express } from 'express';
import loginRoute from './routes/login.route.js';
import registerRoute from './routes/register.route.js';
import { auth } from './middleware/auth.js';
//import cors from 'cors';

const app: Express = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.get('/token', auth, (req, res) => {
  res.sendStatus(200);
});

export default app;
