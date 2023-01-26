import express, { Express, Request, Response } from 'express';
import { KafkaClient, Consumer, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';
import { mailSender } from './mailSender.js';
import { logger } from './logger.js';
import { Topics } from './types/kafkaTopics.enum.js';
import { scheduleElementArray } from './models/schedule.array.js';
import mailBuilder from './emails/mailBuilder.js';
import scheduleBuilder from './emails/scheduleBuilder.js';
import scheduleContent from './emails/scheduleContent.js';
import creditTermBuilder from './emails/creditTermBuilder.js';
import loanAgreementBuilder from './emails/loanAgreementBuilder.js';
import secCodeBuilder from './emails/secCodeBuilder.js';
//import KafkaJsConsumer from './consumer.kafkaJS.js'; //reserved kafka consumer!

const app: Express = express();

const client: KafkaClient = new KafkaClient({ kafkaHost: 'kafka1:29092' }); //localhost:9092 for external and ports 9092/19092

//const kafkaJsConsumer: KafkaJsConsumer = new KafkaJsConsumer();  //reserved kafka consumer!
//kafkaJsConsumer.startConsumer();  //reserved kafka consumer!

const topics: OffsetFetchRequest[] = [
  { topic: 'finish-registration', partition: 0 },
  { topic: 'create-documents', partition: 0 },
  { topic: 'send-documents', partition: 0 },
  { topic: 'send-ses', partition: 0 },
  { topic: 'credit-issued', partition: 0 },
  { topic: 'application-denied', partition: 0 },
  { topic: 'kafkatest', partition: 0 },
];

const options: ConsumerOptions = {
  groupId: 'kafka-node-group', //consumer group id, default `kafka-node-group`
  // Auto commit config
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
  fetchMaxWaitMs: 100,
  // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
  fetchMinBytes: 1,
  // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
  fetchMaxBytes: 1024 * 1024,
  // If set true, consumer will fetch message from the given offset in the payloads
  fromOffset: false,
  // If set to 'buffer', values will be returned as raw buffer objects.
  encoding: 'utf8',
  keyEncoding: 'utf8',
};

const consumer = new Consumer(client, topics, options);

app.use(express.json());

//⚡test route for email sending
app.post('/email', async (req: Request, res: Response) => {
  try {
    await mailSender(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.subject,
      mailBuilder(req.body.firstName, req.body.lastName, req.body.text),
    );
    res.sendStatus(200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // ❌ TypeScript knows err is Error
      res.status(400).send(error.message);
    } else {
      // ❌ Unexpected error
      res.status(400).send({ error: 'unexpected error' });
    }
  }
});

//⚡test route for email template - terms & schedule
app.get('/schedule', async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send(
        mailBuilder('Denis', 'Shepelev', 'Look at your schedule dude!', [
          creditTermBuilder(155000, 8, 8, 7.95, true, true),
          scheduleBuilder(scheduleContent(19960.76, scheduleElementArray)),
        ]),
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // ❌ TypeScript knows err is Error
      res.status(400).send(error.message);
    } else {
      // ❌ Unexpected error
      res.status(400).send({ error: 'unexpected error' });
    }
  }
});

//⚡test route for email template - loan agreement
app.get('/loan', async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .send(
        mailBuilder('Denis', 'Shepelev', 'Look at your loan agreement dude!', [
          loanAgreementBuilder(
            'Denis',
            'Shepelev',
            155000,
            8,
            creditTermBuilder(155000, 8, 8, 7.95, true, true),
            scheduleBuilder(scheduleContent(19960.76, scheduleElementArray)),
            '2023-01-14',
          ),
        ]),
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // ❌ TypeScript knows err is Error
      res.status(400).send(error.message);
    } else {
      // ❌ Unexpected error
      res.status(400).send({ error: 'unexpected error' });
    }
  }
});

consumer.on('message', async function (message) {
  console.log('kafka message: 🔥');
  console.log(message);
  const topic = message.topic;
  let value;
  if (typeof message.value === 'string' && message.value !== null) {
    value = JSON.parse(message.value); //as unknown as EmailDTO;
  }
  switch (topic) {
    case Topics.finishRegistration: {
      try {
        const text =
          'Dear client. For detailed loan offer with schedule please follow bank cite and finish registration';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case Topics.createDocuments: {
      try {
        const text =
          //send terms and schedule
          'Dear client. We are happy to announce the loan approval for you. Next, you can read the terms of the approved loan. We propose to proceed to the next step and if you are ready - request a set of documents for signing';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text, [
            creditTermBuilder(
              value.credit.amount,
              value.credit.term,
              value.credit.rate,
              value.credit.psk,
              value.credit.isInsuranceEnabled,
              value.credit.isSalaryClient,
            ),
            scheduleBuilder(scheduleContent(value.credit.monthlyPayment, value.credit.paymentSchedule)),
          ]),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case Topics.sendDocuments: {
      //send loan agreement
      try {
        const text =
          'Dear client. We se sent you a loan agreement. A loan agreement is the document in which a lender - usually a bank or other financial institution - sets out the terms and conditions under which it is prepared to make a loan available to a borrower. When you are ready, move on to the next step and request a digital signing key';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text, [
            loanAgreementBuilder(
              value.firstName,
              value.lastName,
              value.credit.amount,
              value.credit.rate,
              creditTermBuilder(
                value.credit.amount,
                value.credit.term,
                value.credit.rate,
                value.credit.psk,
                value.credit.isInsuranceEnabled,
                value.credit.isSalaryClient,
              ),
              scheduleBuilder(scheduleContent(value.credit.monthlyPayment, value.credit.paymentSchedule)),
              '2023-01-14',
            ),
          ]),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case Topics.sendSes: {
      //send security code for loan agreement signing
      try {
        const text = 'Dear client. We se sent you security code to sign your loan agreement. Never share security code';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text, [secCodeBuilder(value.ses)]),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case Topics.creditIssued: {
      //send FINAL email about credit issued
      try {
        const text = 'Dear client. You signed your loan agreement with digital security code. The loan is ISSUED';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case Topics.applicationDenied: {
      //send email notify about failed loan application
      try {
        const text = 'Dear client. Your loan application is denied status';
        await mailSender(
          value.email,
          value.firstName,
          value.lastName,
          topic,
          mailBuilder(value.firstName, value.lastName, text),
        );
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }
      break;
    }
    case 'kafkatest': {
      //send email notify about failed loan application
      try {
        const text = 'Dear client. this is test message!';
        await mailSender(
          'denisshepelev@mail.ru',
          'Denis',
          'Shepelev',
          topic,
          mailBuilder(value.firstName, value.lastName, text),
        );
        logger.info(`kafkatest happened and sent test message`);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`sending message problem, see error: ${error.message}`);
        }
      }

      break;
    }
    default: {
      logger.info(`Received unhandled topic, unsubscribe please topic: ${topic}`);
      break;
    }
  }
});

consumer.on('error', (e) => {
  logger.error('Kafka Consumer error', e.message);
  logger.error(e);
  logger.debug(e);
});

export default app;
