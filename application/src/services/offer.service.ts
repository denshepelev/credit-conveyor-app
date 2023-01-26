import { LoanOfferDTO } from '../dto/loanOffer.dto.js';
import { validate } from 'class-validator';
import axios from 'axios';

export class OfferService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createLoanOffer(parameters: any): LoanOfferDTO {
    const loanOffer = new LoanOfferDTO();
    loanOffer.applicationId = parameters.applicationId;
    loanOffer.requestedAmount = parameters.requestedAmount;
    loanOffer.totalAmount = parameters.totalAmount;
    loanOffer.term = parameters.term;
    loanOffer.monthlyPayment = parameters.monthlyPayment;
    loanOffer.rate = parameters.rate;
    loanOffer.isInsuranceEnabled = parameters.isInsuranceEnabled;
    loanOffer.isSalaryClient = parameters.isSalaryClient;
    return loanOffer;
  }
  async validateLoanOffer(parameters: LoanOfferDTO): Promise<void> {
    await validate(parameters).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
      }
    });
  }

  async sendOffer(loanOfferDTO: LoanOfferDTO): Promise<void> {
    const res = await axios.put('http://deal:3002/deal/offer', loanOfferDTO);

    if (res.status === 400) {
      throw new Error(res.data.error);
    }

    return res.data;
  }
}
