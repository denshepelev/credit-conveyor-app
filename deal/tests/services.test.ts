import { ApplicationService } from '../src/services/application.service.js';
import { LoanApplicationRequestDTO } from '../src/dto/loanApplicationRequest.dto.js';
import { pool } from '../src/db/db.js';
import { StatusHistory } from '../src/models/statusHistory.model.js';
import { ApplicationStatus } from '../src/types/applicationStatus.enum.js';
import { ChangeType } from '../src/types/changeType.enum.js';

const applicationService: ApplicationService = new ApplicationService();
const loanApplicationRequest: LoanApplicationRequestDTO = new LoanApplicationRequestDTO();
loanApplicationRequest.amount = 120000;
loanApplicationRequest.term = 6;
loanApplicationRequest.firstName = 'Denis';
loanApplicationRequest.lastName = 'Shepelev';
loanApplicationRequest.middleName = 'Valerievich';
loanApplicationRequest.email = 'denisshepelev@mail.ru';
loanApplicationRequest.birthDate = '1987-06-28';
loanApplicationRequest.passportSeries = '6666';
loanApplicationRequest.passportNumber = '666666';

let passportId: number;
let clientId: number;
let applicationId: number;
const statusHistory: StatusHistory = new StatusHistory(
  ApplicationStatus.DOCUMENT_CREATED,
  new Date(),
  ChangeType.AUTOMATIC,
);

const statusHistoryArray: Array<StatusHistory> = [];

statusHistoryArray.push(statusHistory);

beforeAll(() => {
  //return initializeCityDatabase();
  console.log('Before ALL');
});

afterAll(async () => {
  try {
    const text = `
    DELETE FROM application;
    DELETE FROM client;
    DELETE FROM passport;`;
    await pool.query(text).catch((e) => {
      throw new Error(e.message);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
  console.log('After ALL');
  await pool.end();
});

// 🚩 APPLICATION SERVICE LAYER TEST 🚩

test('check return passport_id after insert laonApplication', async () => {
  passportId = await applicationService.insertPassportData(loanApplicationRequest);
  let toBePassportId: number;
  try {
    const text = `SELECT passport_id FROM passport WHERE series = '6666' and number = '666666'`;
    toBePassportId = await pool
      .query(text)
      .then((res) => {
        return res.rows[0].passport_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    toBePassportId = 0;
  }
  expect(passportId).toBe(toBePassportId);
});

test('check return client_id after insert laonApplication', async () => {
  clientId = await applicationService.insertClientData(passportId, loanApplicationRequest);
  let toBeClientId: number;
  try {
    const text = `SELECT client_id FROM client WHERE first_name = 'Denis' and last_name = 'Shepelev' and email = 'denisshepelev@mail.ru' and passport_id = ${passportId}`;
    toBeClientId = await pool
      .query(text)
      .then((res) => {
        return res.rows[0].client_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    toBeClientId = 0;
  }
  expect(clientId).toBe(toBeClientId);
});

test('check return application_id after insert laonApplication', async () => {
  applicationId = await applicationService.insertApplicationData(
    clientId,
    ApplicationStatus.DOCUMENT_CREATED,
    new Date(),
    statusHistoryArray,
  );
  let toBeApplicationId: number;
  try {
    const text = `SELECT application_id FROM application WHERE client_id = ${clientId};`;
    toBeApplicationId = await pool
      .query(text)
      .then((res) => {
        return res.rows[0].application_id;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    toBeApplicationId = 0;
  }
  expect(applicationId).toBe(toBeApplicationId);
});

// 🚩 OFFER SERVICE LAYER TEST 🚩
