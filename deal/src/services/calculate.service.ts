import axios from 'axios';
import { validate } from 'class-validator';
import { pool } from '../db/db.js';
import { FinishRegistrationRequestDTO } from '../dto/finishRegistrationRequest.dto.js';
import { EmploymentDTO } from '../dto/employment.dto.js';
import { ScoringDataDTO } from '../dto/scoringData.dto.js';
import { CreditDTO } from '../dto/credit.dto.js';
import { CreditStatus } from '../types/creditStatus.enum.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { logger } from '../logger.js';

export class CalculateService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createFinishRegistrationRequestDTO(parameters: any): FinishRegistrationRequestDTO {
    const finishRegistrationRequest = new FinishRegistrationRequestDTO();
    const employment = new EmploymentDTO();
    finishRegistrationRequest.gender = parameters.gender;
    finishRegistrationRequest.maritalStatus = parameters.maritalStatus;
    finishRegistrationRequest.dependentAmount = parameters.dependentAmount;
    finishRegistrationRequest.passportIssueDate = parameters.passportIssueDate;
    finishRegistrationRequest.passportIssueBranch = parameters.passportIssueBranch;
    finishRegistrationRequest.account = parameters.account;
    employment.employmentStatus = parameters.employment.employmentStatus;
    employment.employerINN = parameters.employment.employerINN;
    employment.salary = parameters.employment.salary;
    employment.position = parameters.employment.position;
    employment.workExperienceTotal = parameters.employment.workExperienceTotal;
    employment.workExperienceCurrent = parameters.employment.workExperienceCurrent;
    finishRegistrationRequest.employment = employment;
    return finishRegistrationRequest;
  }

  public async validateFinishRegistrationRequest(
    finishRegistrationRequest: FinishRegistrationRequestDTO,
  ): Promise<void> {
    await validate(finishRegistrationRequest).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
      }
    });
  }

  //✅ CHECK if application_id exists
  async checkApplicationIdExist(applicationID: number): Promise<void> {
    interface CheckResponse {
      exists: boolean;
    }
    function isCheckResponse(obj: unknown): obj is CheckResponse {
      return typeof obj === 'object' && obj !== null && 'exists' in obj;
    }

    const text = 'select exists(select 1 from application where application_id = $1);';

    const values = [applicationID];

    const status: CheckResponse = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    if (isCheckResponse(status)) {
      if (status.exists) {
        logger.error('loanOffers application_id is checked');
      } else {
        throw new Error('application_id not exists');
      }
    } else {
      logger.error('data base error response');
      throw new Error('data base error response');
    }
  }

  public async getScoringData(
    applicationID: number,
    finishRegistrationRequest: FinishRegistrationRequestDTO,
  ): Promise<[ScoringDataDTO, number, number]> {
    const text =
      'SELECT * FROM APPLICATION INNER JOIN CLIENT USING (CLIENT_ID) INNER JOIN PASSPORT USING (PASSPORT_ID) WHERE APPLICATION.APPLICATION_ID = $1;';
    const values = [applicationID];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const personalData: any = await pool
      .query(text, values)
      .then((res) => {
        //console.log(res.rows[0].passport_id);
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    const scoringData: ScoringDataDTO = new ScoringDataDTO();
    scoringData.amount = personalData.applied_offer.requestedAmount;
    scoringData.term = personalData.applied_offer.term;
    scoringData.firstName = personalData.first_name;
    scoringData.lastName = personalData.last_name;
    scoringData.middleName = personalData.middle_name;
    scoringData.gender = finishRegistrationRequest.gender;
    scoringData.birthDate = personalData.birth_date;
    scoringData.passportSeries = personalData.series;
    scoringData.passportNumber = personalData.number;
    scoringData.passportIssueDate = finishRegistrationRequest.passportIssueDate;
    scoringData.passportIssueBranch = finishRegistrationRequest.passportIssueBranch;
    scoringData.maritalStatus = finishRegistrationRequest.maritalStatus;
    scoringData.dependentAmount = finishRegistrationRequest.dependentAmount;
    scoringData.isSalaryClient = personalData.applied_offer.isSalaryClient;
    scoringData.account = finishRegistrationRequest.account;
    scoringData.isInsuranceEnabled = personalData.applied_offer.isInsuranceEnabled;
    scoringData.employment = finishRegistrationRequest.employment;

    const clientID = personalData.client_id;
    const passportID = personalData.passport_id;

    return [scoringData, clientID, passportID];
  }

  public async finishRegistration(scoringData: ScoringDataDTO, clientID: number, passportID: number): Promise<void> {
    //update row  in passport table according to user information
    const textPassport = 'UPDATE passport SET issue_branch = $1, issue_date = $2 WHERE passport_id = $3';
    const valuesPassport = [scoringData.passportIssueBranch, scoringData.passportIssueDate, passportID];
    await pool
      .query(textPassport, valuesPassport)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    //insert new row into employment table  according to user information
    const textEmployment =
      'INSERT INTO employment (status, employer_inn, salary, position, work_experience_total, work_experience_current) VALUES($1, $2, $3, $4, $5, $6) RETURNING employment_id';
    const valuesEmployment = [
      scoringData.employment.employmentStatus,
      scoringData.employment.employerINN,
      scoringData.employment.salary,
      scoringData.employment.position,
      scoringData.employment.workExperienceTotal,
      scoringData.employment.workExperienceCurrent,
    ];
    const employmentID: number = await pool
      .query(textEmployment, valuesEmployment)
      .then((res) => {
        return res.rows[0].employment_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    //update row in client table  according to user information
    const textClient =
      'UPDATE client SET gender = $1, marital_status = $2, dependent_amount = $3, employment_id = $4, account = $5  WHERE client_id = $6';
    const valuesClient = [
      scoringData.gender,
      scoringData.maritalStatus,
      scoringData.dependentAmount,
      employmentID,
      scoringData.account,
      clientID,
    ];
    await pool
      .query(textClient, valuesClient)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  public async getCredit(scoringData: ScoringDataDTO): Promise<CreditDTO> {
    const res = await axios.post('http://credit:3001/conveyor/calculation', scoringData).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
      }
      //console.log(error.config);
    });
    //console.log(res.data);
    if (res.status === 400) {
      throw new Error(res.data.error);
    }
    return res.data;
  }

  public async insertCredit(credit: CreditDTO, creditStatus: CreditStatus): Promise<number> {
    const text =
      'INSERT INTO credit (amount, term, monthly_payment, rate, psk, payment_schedule, insurance_enable, salary_client, credit_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING credit_id';
    const values = [
      credit.amount,
      credit.term,
      credit.monthlyPayment,
      credit.rate,
      credit.psk,
      JSON.stringify(credit.paymentSchedule),
      credit.isInsuranceEnabled,
      credit.isSalaryClient,
      creditStatus,
    ];
    const creditID: number = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0].credit_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    return creditID;
  }

  public async updateApplicationCreditID(creditID: number, applicationID: number): Promise<void> {
    const text = 'UPDATE application SET credit_id = $1 WHERE application_id = $2';
    const values = [creditID, applicationID];
    await pool
      .query(text, values)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  public async updateApplicationStatusHistory(statusHistory: StatusHistory, applicationID: number): Promise<void> {
    //SELECT status_history FROM application;
    const textSelect = 'SELECT status_history FROM application WHERE application_id = $1';
    const valuesSelect = [applicationID];
    let statusHistoryArray: Array<StatusHistory> = await pool
      .query(textSelect, valuesSelect)
      .then((res) => {
        return res.rows[0].status_history;
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    if (statusHistoryArray == null) {
      statusHistoryArray = [];
    }
    //UPDATE status_history FROM application;
    statusHistoryArray.push(statusHistory);
    const textUpdate = 'UPDATE application SET status_history = $1 WHERE application_id = $2';
    const valuesUpdate = [JSON.stringify(statusHistoryArray), applicationID];
    await pool
      .query(textUpdate, valuesUpdate)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }

  public async updateApplicationStatus(status: ApplicationStatus, applicationID: number): Promise<void> {
    const text = 'UPDATE application SET status = $1 WHERE application_id = $2';
    const values = [status, applicationID];
    await pool
      .query(text, values)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  }
}
