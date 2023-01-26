import axios from 'axios';
import { LoanApplicationRequestDTO } from '../dto/loanApplicationRequest.dto.js';
import { validate } from 'class-validator';
import { LoanOfferDTO } from '../dto/loanOffer.dto.js';

export class ApplicationService {
  async validateLoanApplication(parameters: LoanApplicationRequestDTO): Promise<void> {
    await validate(parameters).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createLoanApplication(parameters: any): LoanApplicationRequestDTO {
    const loanApplication: LoanApplicationRequestDTO = new LoanApplicationRequestDTO();

    loanApplication.amount = parameters.amount;
    loanApplication.term = parameters.term;
    loanApplication.firstName = parameters.firstName;
    loanApplication.lastName = parameters.lastName;
    loanApplication.middleName = parameters.middleName;
    loanApplication.email = parameters.email;
    loanApplication.birthDate = parameters.birthDate;
    loanApplication.passportSeries = parameters.passportSeries;
    loanApplication.passportNumber = parameters.passportNumber;
    return loanApplication;
  }

  async getOffers(loanApplication: LoanApplicationRequestDTO): Promise<Array<LoanOfferDTO>> {
    const res = await axios.post('http://deal:3002/deal/application', loanApplication).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log('error.response.data.....................');
        console.log(error.response.data);
        throw new Error(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log('error.request...........................');
        console.log(error.request);
        throw new Error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('error.message............................');
        console.log(error.message);
        throw new Error(error.message);
      }
      //console.log(error.config);
    });
    return res.data;
  }
}
