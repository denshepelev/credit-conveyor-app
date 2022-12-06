import { Request, Response } from "express";
import { OfferService } from "../services/offer.service";

const createOffers = async (req: Request, res: Response) => {
  try {
    const offerService = new OfferService(req.body);
    res
      .status(200)
      .send(JSON.stringify(offerService.getLoanOfferDTOList(), null, 3));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
export { createOffers };
