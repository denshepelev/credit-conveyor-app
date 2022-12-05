import { Request, Response } from "express";
import { LoanApplicationRequestDTO } from "../dto/loanApplicationRequest.dto";
import { LoanScorer } from "../utils/loanScorer";

const createOffers = async (req: Request, res: Response) => {
  try {
    const offers = new LoanScorer(
      new LoanApplicationRequestDTO(
        Number(req.body.amount),
        Number(req.body.term),
        req.body.firstName,
        req.body.lastName,
        req.body.middleName,
        req.body.email,
        req.body.birthdate,
        req.body.passportSeries,
        req.body.passportNumber
      )
    );
    res.status(200).send(JSON.stringify(offers.getLoanOfferDTOList(), null, 3));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
export { createOffers };
