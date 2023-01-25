import { Request, Response } from 'express';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';
import { Topics } from '../types/kafkaTopics.enum.js';
import { EmailMessage } from '../dto/email.dto.js';
import { producer } from '../kafka/kafkaJS.js';
import { SendService } from '../services/send.service.js';

const sendService = new SendService();

const sendController = async (req: Request, res: Response) => {
  try {
    if (!req.params.applicationId) {
      //❌ check if applicationID exist
      throw new Error('parameter applicationID is required');
    }

    await sendService.checkApplicationIdExist(Number(req.params.applicationId));

    /*
     * ⇩
     * ✉ KAFKA MAINTAIN BLOCK
     * ⇩
     */

    //✅ get EmailMessage for kafka message
    const emailMessage: EmailMessage = await sendService.getApplicationClientCredit(Number(req.params.applicationId));

    //✅ SEND kafka message
    await producer.start();
    await producer.sendMessage(Topics.sendDocuments, JSON.stringify(emailMessage));
    await producer.shutdown();

    const statusHistory: StatusHistory = new StatusHistory(
      ApplicationStatus.DOCUMENT_CREATED,
      new Date(),
      ChangeType.AUTOMATIC,
    );

    //✅ UPDATE status, status history and date
    await sendService.updateApplicationStatusHistory(statusHistory, Number(req.params.applicationId));

    await sendService.updateApplicationStatus(ApplicationStatus.DOCUMENT_CREATED, Number(req.params.applicationId));

    await sendService.updateAppCreationDate(new Date(), Number(req.params.applicationId));

    //res.status(200).send([application, client, credit]); //only for debug
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

export { sendController };
