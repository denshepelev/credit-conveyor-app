import { LoanOfferDTO } from '../dto/loanOffer.dto.js';
import { validate } from 'class-validator';
import { pool } from '../db/db.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { EmailMessage } from '../dto/email.dto.js';
import { logger } from '../logger.js';

export class OfferService {
  //✅ CREATE new objet from from Req
  createLoanOffer(parameters: LoanOfferDTO): LoanOfferDTO {
    const loanOffer = new LoanOfferDTO();
    loanOffer.applicationId = parameters.applicationId;
    loanOffer.requestedAmount = parameters.requestedAmount;
    loanOffer.totalAmount = parameters.totalAmount;
    loanOffer.term = parameters.term;
    loanOffer.monthlyPayment = parameters.monthlyPayment;
    loanOffer.rate = parameters.rate;
    loanOffer.isInsuranceEnabled = parameters.isInsuranceEnabled;
    loanOffer.isSalaryClient = parameters.isSalaryClient;
    logger.info('loanOffer created');
    return loanOffer;
  }
  //✅ VALIDATE input parameters
  async validateLoanOffer(parameters: LoanOfferDTO): Promise<void> {
    await validate(parameters).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        //❌ throw on error number
        throw new Error(JSON.stringify(errors));
      }
    });
    logger.info('loanOffer success validated');
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

  //✅ UPDATE offer, status in [application]
  async updateApplication(status: ApplicationStatus, appliedOffer: string, applicationID: number): Promise<number> {
    const text = 'UPDATE application SET status = $1, applied_offer = $2 WHERE application_id = $3;';
    const values = [status, appliedOffer, applicationID];
    const updateCount = await pool
      .query(text, values)
      .then((res) => {
        return res.rowCount;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    logger.info('offer, status in [application] is updated');
    return updateCount;
  }

  //✅ UPDATE [application].status_history
  public async updateApplicationStatusHistory(statusHistory: StatusHistory, applicationID: number): Promise<void> {
    //✅SELECT status_history FROM [application]
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
    logger.info('status history extracted success');

    //✅ADD new status_history => UPDATE [application];
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
    logger.info('status history updated success');
  }

  public async getEmailData(applicationID: number): Promise<EmailMessage> {
    //✅SELECT first_name, last_name, email from [client]
    const textSelect =
      'SELECT first_name, last_name, email FROM APPLICATION INNER JOIN CLIENT USING (CLIENT_ID) WHERE APPLICATION.APPLICATION_ID = $1';
    const valuesSelect = [applicationID];
    const emailData = await pool
      .query(textSelect, valuesSelect)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    logger.info('data extracted success');
    const email: EmailMessage = {
      email: emailData.email,
      firstName: emailData.first_name,
      lastName: emailData.last_name,
    };
    logger.info('emailMessage created'); //VALIDATE NEED!!!!
    return email;
  }
}
