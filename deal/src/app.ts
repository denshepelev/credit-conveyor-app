import express, { Express, Request, Response } from 'express';
import { EmailMessage } from './dto/email.dto.js';
import dealRoute from './routes/deal.route.js';
import { OfferService } from './services/offer.service.js';
//import { publish } from './kafka/producer.event.js'; //deprecated
import { Topics } from './types/kafkaTopics.enum.js';
import { producer } from './kafka/kafkaJS.js';

const app: Express = express();
const offerService = new OfferService();

app.use(express.json());

app.use('/deal', dealRoute);

//⚡test route for kafka finishRegistration topic with value email for user with application.ID from DB
app.post('/email/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const emailData: EmailMessage = await offerService.getEmailData(id);
  await producer.start();
  await producer.sendMessage(Topics.finishRegistration, JSON.stringify(emailData));
  await producer.shutdown();
  //publish(Topics.finishRegistration, JSON.stringify(emailData));
  res.sendStatus(200);
});

app.post('/kafkatest', async (req: Request, res: Response) => {
  await producer.start();
  await producer.sendMessage('kafkatest', JSON.stringify({ kafka: req.body.kafka }));
  await producer.shutdown();
  res.sendStatus(200);
});

export default app;
