import { Request, Response } from "express";
import { OfferService } from "../services/offers.service";

const offersService = new OfferService();

const createOffers = async (req: Request, res: Response) => {
  try {
    const offers = offersService.getLoanOfferDTOList(req.body);
    res.status(200).send(JSON.stringify(offers));
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
export { createOffers };
