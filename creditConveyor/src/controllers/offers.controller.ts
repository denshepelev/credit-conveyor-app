import { Request, Response } from 'express';
import { ConveyorRejectionError } from '../errors/conveyorRejection.error.js';
import { ConveyorValidationError } from '../errors/conveyorValidation.error.js';
import { OfferService } from '../services/offers.service.js';
import { CreditStatus } from '../types/creditStatus.enum.js';

const offersService = new OfferService();

const createOffers = async (req: Request, res: Response) => {
  try {
    const offers = offersService.getLoanOfferDTOList(req.body);
    res.status(200).send(JSON.stringify(offers));
  } catch (error: unknown) {
    if (error instanceof ConveyorRejectionError) {
      res.status(200).send({ status: CreditStatus.CC_DENIED, error: error.message }); // status ✅ reason denied  during normal process
    } else if (error instanceof ConveyorValidationError) {
      res.status(400).send({ error: error.message }); // status ❌ reason denied  during normal process
    } else if (error instanceof Error) {
      res.status(400).send({ error: error.message }); // status ❌ reason denied  during normal process
    } else res.status(400).send({ error: 'unknown error during getting offers' }); // status ❌ reason denied  during normal process
  }
};
export { createOffers };
