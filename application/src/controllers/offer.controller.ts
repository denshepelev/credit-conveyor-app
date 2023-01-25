import { Request, Response } from 'express';
import { OfferService } from '../services/offer.service.js';

const offerService = new OfferService();

const offerController = async (req: Request, res: Response) => {
  try {
    const loanOffer = offerService.createLoanOffer(req.body);

    await offerService.validateLoanOffer(loanOffer);

    await offerService.sendOffer(loanOffer);

    res.sendStatus(200);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export { offerController };
