import supertest from 'supertest';
import app from '../src/app.js';

describe('POST /conveyor/offers', () => {
  it('returns 4 offers', async () => {
    const result = await supertest(app).post('/conveyor/offers').send({
      amount: 120000,
      term: 6,
      firstName: 'Denis',
      lastName: 'Shepelev',
      middleName: 'Valerievich',
      email: 'mail@mail.ru',
      birthDate: '1987-06-28',
      passportSeries: '6305',
      passportNumber: '555566',
    });
    expect(result.text).toEqual(
      '[{"applicationId":4,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21041.48,"rate":9,"isInsuranceEnabled":true,"isSalaryClient":true},{"applicationId":2,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21102.05,"rate":10,"isInsuranceEnabled":true,"isSalaryClient":false},{"applicationId":3,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20646.55,"rate":11,"isInsuranceEnabled":false,"isSalaryClient":true},{"applicationId":1,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20705.8,"rate":12,"isInsuranceEnabled":false,"isSalaryClient":false}]',
    );
    expect(result.statusCode).toEqual(200);
  });
});

describe('POST /conveyor/calculation', () => {
  it('returns loan', async () => {
    const result = await supertest(app)
      .post('/conveyor/calculation')
      .send({
        amount: 150000,
        term: 8,
        firstName: 'Denis',
        lastName: 'Shepelev',
        middleName: 'Valerievich',
        gender: 'MALE',
        birthDate: '1987-06-28',
        passportSeries: '6307',
        passportNumber: '666666',
        passportIssueDate: '2007-06-28',
        passportIssueBranch: 'passportIssueBranch',
        maritalStatus: 'SINGLE',
        dependentAmount: 0,
        employment: {
          employmentStatus: 'EMPLOYED',
          employerINN: '777777',
          salary: 50000,
          position: 'MID_MANAGER',
          workExperienceTotal: 50,
          workExperienceCurrent: 10,
        },
        account: 'account',
        isInsuranceEnabled: true,
        isSalaryClient: true,
        firstPayment: '2023-01-09',
      });
    expect(result.text).toEqual(
      '{"amount":155000,"term":8,"monthlyPayment":19960.76,"rate":8,"psk":7.95,"isInsuranceEnabled":true,"isSalaryClient":true,"paymentSchedule":[{"number":1,"date":"2023-01-09","totalPayment":18927.43,"interestPayment":1033.33,"debtPayment":18927.43,"remainingDebt":136072.57},{"number":2,"date":"2023-02-09","totalPayment":38888.19,"interestPayment":907.15,"debtPayment":19053.61,"remainingDebt":117018.96},{"number":3,"date":"2023-03-09","totalPayment":58848.95,"interestPayment":780.13,"debtPayment":19180.63,"remainingDebt":97838.33},{"number":4,"date":"2023-04-09","totalPayment":78809.71,"interestPayment":652.26,"debtPayment":19308.5,"remainingDebt":78529.83},{"number":5,"date":"2023-05-09","totalPayment":98770.47,"interestPayment":523.53,"debtPayment":19437.23,"remainingDebt":59092.6},{"number":6,"date":"2023-06-09","totalPayment":118731.23,"interestPayment":393.95,"debtPayment":19566.81,"remainingDebt":39525.79},{"number":7,"date":"2023-07-09","totalPayment":138691.99,"interestPayment":263.51,"debtPayment":19697.25,"remainingDebt":19828.54},{"number":8,"date":"2023-08-09","totalPayment":158652.75,"interestPayment":132.19,"debtPayment":19828.57,"remainingDebt":-0.03}]}',
    );
    expect(result.statusCode).toEqual(200);
  });
});
