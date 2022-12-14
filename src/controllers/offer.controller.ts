import { Request, Response } from "express";
import { OfferService } from "../services/offer.service";

const offerService = new OfferService();

const createOffers = async (req: Request, res: Response) => {
  try {
    const offers = offerService.getLoanOfferDTOList(req.body);
    res.status(200).send(JSON.stringify(offers));
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
export { createOffers };
