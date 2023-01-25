import { pool } from '../db/db.js';
import { EmailMessage } from '../dto/email.dto.js';
import { logger } from '../logger.js';

export class SignService {
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
  public generateSecCode(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }
  public async updateSecCode(code: string, applicationID: number): Promise<void> {
    const text = 'UPDATE application SET ses_code = $1 WHERE application_id = $2';
    const values = [code, applicationID];
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
