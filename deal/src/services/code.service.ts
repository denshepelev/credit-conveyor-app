import { pool } from '../db/db.js';
import { StatusHistory } from '../models/statusHistory.model.js';
import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { EmailMessage } from '../dto/email.dto.js';
import { logger } from '../logger.js';

export class CodeService {
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
        logger.info('loanOffers application_id is checked');
      } else {
        throw new Error('application_id not exists');
      }
    } else {
      logger.error('data base error response');
      throw new Error('data base error response');
    }
  }

  public async getEmailMessage(applicationID: number): Promise<EmailMessage> {
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
    const emailMessage: EmailMessage = {
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
    };
    return emailMessage;
  }

  public async checkSes(ses: string, applicationID: number): Promise<void> {
    const text = 'SELECT * FROM APPLICATION WHERE APPLICATION_ID = $1;';
    const values = [applicationID];
    const data = await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
    logger.info(`provided code: ${ses}, required: ${data.ses_code}`);
    if (data.ses_code !== ses) {
      throw new Error('code does not match');
    }
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

  public async updateAppSignDate(date: Date, applicationID: number): Promise<void> {
    const text = 'UPDATE application SET sign_date = $1 WHERE application_id = $2';
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
