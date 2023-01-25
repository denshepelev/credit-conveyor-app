import { Request, Response } from 'express';
import { LoanOfferDTO } from '../dto/loanOffer.dto.js';
import { ApplicationService } from '../services/application.service.js';

const applicationService = new ApplicationService();

const applicationController = async (req: Request, res: Response) => {
  try {
    const loanApplication = applicationService.createLoanApplication(req.body);
    await applicationService.validateLoanApplication(loanApplication);
    const offersArray: Array<LoanOfferDTO> = await applicationService.getOffers(loanApplication);
    res.status(200).send(offersArray);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
export { applicationController };
