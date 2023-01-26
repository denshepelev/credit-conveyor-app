import axios from 'axios';
import { LoanApplicationRequestDTO } from '../dto/loanApplicationRequest.dto.js';
import { validate } from 'class-validator';
import { pool } from '../db/db.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { LoanOfferDTO } from '../dto/loanOffer.dto.js';
import { StatusHistory } from '../models/statusHistory.model.js';

export class ApplicationService {
  /*constructor(parameters) {
        
    }*/
  async getPlaceHolder(): Promise<string> {
    const payload = { title: 'foo', body: 'bar', userId: 1 };
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', payload);
    //console.log(res.data);
    return res.data;
  }
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

  async insertPassportData(parameters: LoanApplicationRequestDTO): Promise<number> {
    const text = 'INSERT INTO passport (series, number) VALUES($1, $2) RETURNING passport_id';
    const values = [parameters.passportSeries, parameters.passportNumber];
    const passportID: number = await pool
      .query(text, values)
      .then((res) => {
        //console.log(res.rows[0].passport_id);
        return res.rows[0].passport_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return passportID;
  }

  async insertClientData(passportID: number, parameters: LoanApplicationRequestDTO): Promise<number> {
    const text =
      'INSERT INTO client (last_name, first_name, middle_name, birth_date, email, passport_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING client_id';
    const values = [
      parameters.lastName,
      parameters.firstName,
      parameters.middleName,
      parameters.birthDate,
      parameters.email,
      passportID,
    ];
    const clientID: number = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0].client_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return clientID;
  }

  async insertApplicationData(
    clientID: number,
    status: ApplicationStatus,
    creationDate: Date,
    statusHistoryArray: Array<StatusHistory>,
  ): Promise<number> {
    const text =
      'INSERT INTO application (client_id, status, creation_date, status_history) VALUES($1, $2, $3, $4) RETURNING application_id';
    const values = [clientID, status, creationDate, JSON.stringify(statusHistoryArray)];
    const applicationID: number = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0].application_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return applicationID;
  }

  async getOffers(loanApplication: LoanApplicationRequestDTO): Promise<Array<LoanOfferDTO>> {
    const res = await axios.post('http://credit:3001/conveyor/offers', loanApplication);
    //console.log(res.data);
    if (res.status === 400) {
      throw new Error(res.data.error);
    }
    return res.data;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOffersAny(body: any): Promise<Array<LoanOfferDTO>> {
    const res = await axios.post('http://credit:3001/conveyor/offers', body);
    if (res.status === 400) {
      throw new Error(res.data.error);
    }
    //console.log(res.data);
    return res.data;
  }
}
