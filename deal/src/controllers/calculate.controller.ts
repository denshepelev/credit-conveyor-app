import { Request, Response } from 'express';
import { CreditDTO } from '../dto/credit.dto.js';
import { FinishRegistrationRequestDTO } from '../dto/finishRegistrationRequest.dto.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { CalculateService } from '../services/calculate.service.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';
import { CreditStatus } from '../types/creditStatus.enum.js';
import { producer } from '../kafka/kafkaJS.js';
import { Topics } from '../types/kafkaTopics.enum.js';
import { OfferService } from '../services/offer.service.js';
import { EmailMessage } from '../dto/email.dto.js';

const calculateService: CalculateService = new CalculateService();
const offerService: OfferService = new OfferService();

const calculateController = async (req: Request, res: Response) => {
  try {
    if (!req.params.applicationId) {
      //❌ check if applicationID exist
      throw new Error('parameter applicationID is required');
    }

    await calculateService.checkApplicationIdExist(Number(req.params.applicationId));

    const finishRegistrationRequest: FinishRegistrationRequestDTO = calculateService.createFinishRegistrationRequestDTO(
      req.body,
    );

    await calculateService.validateFinishRegistrationRequest(finishRegistrationRequest);

    const [scoringData, clientID, passportID] = await calculateService.getScoringData(
      Number(req.params.applicationId),
      finishRegistrationRequest,
    );

    await calculateService.finishRegistration(scoringData, clientID, passportID);

    const credit: CreditDTO = await calculateService.getCredit(scoringData);

    if (credit.status == ApplicationStatus.CC_DENIED) {
      const statusHistory: StatusHistory = new StatusHistory(
        ApplicationStatus.CC_DENIED,
        new Date(),
        ChangeType.AUTOMATIC,
      );

      await calculateService.updateApplicationStatusHistory(statusHistory, Number(req.params.applicationId));

      await calculateService.updateApplicationStatus(ApplicationStatus.CC_DENIED, Number(req.params.applicationId));
    } else {
      const creditID: number = await calculateService.insertCredit(credit, CreditStatus.CALCULATED);

      await calculateService.updateApplicationCreditID(creditID, Number(req.params.applicationId));

      const statusHistory: StatusHistory = new StatusHistory(
        ApplicationStatus.CC_APPROVED,
        new Date(),
        ChangeType.AUTOMATIC,
      );

      await calculateService.updateApplicationStatusHistory(statusHistory, Number(req.params.applicationId));

      await calculateService.updateApplicationStatus(ApplicationStatus.CC_APPROVED, Number(req.params.applicationId));

      /*
       * ⇩
       * ✉ KAFKA MAINTAIN BLOCK
       * ⇩
       */

      //✅ get EmailMessage for kafka message
      const emailMessage: EmailMessage = await offerService.getEmailData(Number(req.params.applicationId));

      emailMessage.credit = credit;

      //✅ SEND kafka message
      await producer.start();
      await producer.sendMessage(Topics.createDocuments, JSON.stringify(emailMessage));
      await producer.shutdown();
    }
    res.status(201).send(credit);
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

export { calculateController };
