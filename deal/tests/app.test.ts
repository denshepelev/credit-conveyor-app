//import supertest from 'supertest';
//import app from '../src/app';
/*
describe('POST /application', () => {
  it('returns 4 offers', async () => {
    const result = await supertest(app).post('/application').send({
      amount: 120000,
      term: 6,
      firstName: 'Denis',
      lastName: 'Shepelev',
      middleName: 'Valerievich',
      email: 'mail@mail.ru',
      birthDate: '1987-06-28',
      passportSeries: '9999',
      passportNumber: '999999',
    });
    expect(result.text).toEqual(
      '[{"applicationId":4,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21041.48,"rate":9,"isInsuranceEnabled":true,"isSalaryClient":true},{"applicationId":2,"requestedAmount":120000,"totalAmount":123000,"term":6,"monthlyPayment":21102.05,"rate":10,"isInsuranceEnabled":true,"isSalaryClient":false},{"applicationId":3,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20646.55,"rate":11,"isInsuranceEnabled":false,"isSalaryClient":true},{"applicationId":1,"requestedAmount":120000,"totalAmount":120000,"term":6,"monthlyPayment":20705.8,"rate":12,"isInsuranceEnabled":false,"isSalaryClient":false}]',
    );
    expect(result.statusCode).toEqual(200);
  });
});
*/
test('check if NODE_ENV is test', () => {
  expect(process.env.NODE_ENV).toEqual('test');
});
