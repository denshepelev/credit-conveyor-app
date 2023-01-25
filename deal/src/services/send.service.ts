import { pool } from '../db/db.js';
//import { Application } from '../models/application.model.js';
import { Client } from '../models/client.model.js';
import { Credit } from '../models/credit.model.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { EmailMessage } from '../dto/email.dto.js';
import { CreditDTO } from '../dto/credit.dto.js';
import { logger } from '../logger.js';

export class SendService {
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
  public async getApplicationClientCredit(applicationID: number): Promise<EmailMessage> {
    const text =
      'SELECT * FROM APPLICATION INNER JOIN CLIENT USING (CLIENT_ID) INNER JOIN CREDIT USING (CREDIT_ID) WHERE APPLICATION.APPLICATION_ID = $1;';
    const values = [applicationID];
    const data = await pool
      .query(text, values)
      .then((res) => {
        //console.log(res.rows[0].passport_id);
        if (res.rows[0].client_id === null || typeof res.rows[0].client_id === 'undefined') {
          throw new Error('client_id is null or undefined');
        }
        if (res.rows[0].credit_id === null || typeof res.rows[0].credit_id === 'undefined') {
          throw new Error('credit_id is null or undefined');
        }
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    /*
    const application: Application = {
      applicationID: data.application_id,
      clientID: data.client_id,
      creditID: data.credit_id,
      status: data.status,
      creationDate: data.creation_date,
      appliedOffer: data.applied_offer,
      signDate: data.sign_date,
      sesCode: data.ses_code,
      statusHistory: data.status_history,
    };*/
    const client: Client = {
      clientID: data.client_id,
      lastName: data.last_name,
      firstName: data.first_name,
      middleName: data.middle_name,
      birthDate: data.birth_date,
      email: data.email,
      gender: data.gender,
      maritalStatus: data.marital_status,
      dependentAmount: data.dependent_amount,
      passportID: data.passport_id,
      employmentID: data.employment_id,
      account: data.account,
    };
    const credit: Credit = {
      amount: data.amount,
      term: data.term,
      monthlyPayment: data.monthly_payment,
      rate: data.rate,
      psk: data.psk,
      isInsuranceEnabled: data.insurance_enable,
      isSalaryClient: data.salary_client,
      paymentSchedule: data.payment_schedule,
      status: data.credit_status,
    };
    const emailMessage: EmailMessage = {
      email: client.email,
      firstName: client.firstName,
      lastName: client.lastName,
      credit: credit as unknown as CreditDTO,
    };
    return emailMessage;
  }
  //DECOMPOSE THIS CODE!!! MOVE IT IN ISOLATED SERVICE (COZ IT DOUBLES OFFER and CALCULATE SERVICE)
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

  public async updateAppCreationDate(date: Date, applicationID: number): Promise<void> {
    const text = 'UPDATE application SET creation_date = $1 WHERE application_id = $2';
    const values = [date, applicationID];
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
