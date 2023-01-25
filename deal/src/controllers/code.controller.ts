import { Request, Response } from 'express';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';
import { Topics } from '../types/kafkaTopics.enum.js';
import { EmailMessage } from '../dto/email.dto.js';
import { producer } from '../kafka/kafkaJS.js';
import { CodeService } from '../services/code.service.js';

const codeService = new CodeService();

const codeController = async (req: Request, res: Response) => {
  try {
    if (!req.params.applicationId) {
      //❌ check if applicationID exist
      throw new Error('parameter applicationID in params request is required');
    }

    await codeService.checkApplicationIdExist(Number(req.params.applicationId));

    if (!req.body.ses) {
      //❌ check if ses exist
      throw new Error('parameter ses in body request is required');
    }

    await codeService.checkSes(req.body.ses, Number(req.params.applicationId));

    /*
     * ⇩
     * ✉ KAFKA MAINTAIN BLOCK
     * ⇩
     */

    //✅ get EmailMessage for kafka message
    const emailMessage: EmailMessage = await codeService.getEmailMessage(Number(req.params.applicationId));

    //✅ SEND kafka message
    await producer.start();
    await producer.sendMessage(Topics.creditIssued, JSON.stringify(emailMessage));
    await producer.shutdown();

    const statusHistory: StatusHistory = new StatusHistory(
      ApplicationStatus.CREDIT_ISSUED,
      new Date(),
      ChangeType.AUTOMATIC,
    );

    //✅ UPDATE status, status history and date
    await codeService.updateApplicationStatusHistory(statusHistory, Number(req.params.applicationId));

    await codeService.updateApplicationStatus(ApplicationStatus.CREDIT_ISSUED, Number(req.params.applicationId));

    await codeService.updateAppSignDate(new Date(), Number(req.params.applicationId));

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

export { codeController };
