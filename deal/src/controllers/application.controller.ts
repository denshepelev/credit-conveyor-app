import { Request, Response } from 'express';
import { LoanOfferDTO } from '../dto/loanOffer.dto.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationService } from '../services/application.service.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';

const applicationService = new ApplicationService();

const applicationController = async (req: Request, res: Response) => {
  try {
    const loanApplication = applicationService.createLoanApplication(req.body);

    await applicationService.validateLoanApplication(loanApplication);

    const passport_ID: number = await applicationService.insertPassportData(loanApplication);

    const client_ID: number = await applicationService.insertClientData(passport_ID, loanApplication);

    const statusHistory: StatusHistory = new StatusHistory(
      ApplicationStatus.DOCUMENT_CREATED,
      new Date(),
      ChangeType.AUTOMATIC,
    );

    const statusHistoryArray: Array<StatusHistory> = [];

    statusHistoryArray.push(statusHistory);

    const applicationID: number = await applicationService.insertApplicationData(
      client_ID,
      ApplicationStatus.DOCUMENT_CREATED,
      new Date(),
      statusHistoryArray,
    );

    const offersArray: Array<LoanOfferDTO> = await applicationService.getOffers(loanApplication);

    offersArray.forEach((loanOffer: LoanOfferDTO) => {
      loanOffer.applicationId = applicationID;
    });
    res.status(200).send(offersArray);
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
export { applicationController };
