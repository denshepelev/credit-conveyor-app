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
app.post('/testauth', async (req, res) => {
  try {
    res.status(200).send(req.body);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else res.status(400).send({ error: 'unexpected error' });
  }
});

export default app;
