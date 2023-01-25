import { Request, Response } from 'express';
import { StatusHistory } from '../models/statusHistory.model.js';
import { OfferService } from '../services/offer.service.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';
import { producer } from '../kafka/kafkaJS.js';
import { Topics } from '../types/kafkaTopics.enum.js';
import { EmailMessage } from '../dto/email.dto.js';

const offerService: OfferService = new OfferService();

const offerController = async (req: Request, res: Response) => {
  //👉 SEND one offerDTO => UPDATE [application] => SEND email finish registration
  try {
    //✅ CREATE new objet from from Req
    const loanOffer = offerService.createLoanOffer(req.body);
    //✅ VALIDATE input parameters
    await offerService.validateLoanOffer(loanOffer);
    //✅ CHECK if application_id exists
    await offerService.checkApplicationIdExist(loanOffer.applicationId);
    //✅ UPDATE offer, status in [application]
    await offerService.updateApplication(
      ApplicationStatus.PREAPPROVAL,
      JSON.stringify(loanOffer),
      loanOffer.applicationId,
    );

    //✅ CREATE status_history
    const statusHistory: StatusHistory = new StatusHistory(
      ApplicationStatus.PREAPPROVAL,
      new Date(),
      ChangeType.AUTOMATIC,
    );

    //✅ UPDATE [application].status_history
    await offerService.updateApplicationStatusHistory(statusHistory, loanOffer.applicationId);

    /*
     * ⇩
     * ✉ KAFKA MAINTAIN BLOCK
     * ⇩
     */

    //✅ get EmailMessage for kafka message
    const emailMessage: EmailMessage = await offerService.getEmailData(loanOffer.applicationId);

    //✅ SEND kafka message
    await producer.start();
    await producer.sendMessage(Topics.finishRegistration, JSON.stringify(emailMessage));
    await producer.shutdown();

    res.sendStatus(201);
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

export { offerController };
