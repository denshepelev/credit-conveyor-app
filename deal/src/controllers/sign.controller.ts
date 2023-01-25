import { Request, Response } from 'express';
import { Topics } from '../types/kafkaTopics.enum.js';
import { EmailMessage } from '../dto/email.dto.js';
import { producer } from '../kafka/kafkaJS.js';
import { SignService } from '../services/sign.service.js';

const signService = new SignService();

const signController = async (req: Request, res: Response) => {
  try {
    if (!req.params.applicationId) {
      //❌ check if applicationID exist
      throw new Error('parameter applicationID is required');
    }

    await signService.checkApplicationIdExist(Number(req.params.applicationId));

    /*
     * ⇩
     * ✉ KAFKA MAINTAIN BLOCK
     * ⇩
     */

    //✅ get EmailMessage for kafka message
    const emailMessage: EmailMessage = await signService.getEmailMessage(Number(req.params.applicationId));

    //✅ add security code
    emailMessage.ses = signService.generateSecCode();

    //✅ SEND kafka message
    await producer.start();
    await producer.sendMessage(Topics.sendSes, JSON.stringify(emailMessage));
    await producer.shutdown();

    //✅ UPDATE status, status history and SES
    await signService.updateSecCode(emailMessage.ses, Number(req.params.applicationId));

    res.sendStatus(200);
  } catch (error: unknown) {
    if (error instanceof Error) {
      // ❌ TypeScript knows err is Error
      res.status(400).send({ error: error.message });
    } else {
      // ❌ Unexpected error
      res.status(400).send({ error: 'unexpected error' });
    }
  }
};

export { signController };
