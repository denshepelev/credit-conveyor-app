import { EmploymentStatus } from '../src/types/employmentStatus.enum';
import { Gender } from '../src/types/gender.enum';
import { MaritalStatus } from '../src/types/maritalStatus.enum';
import { Position } from '../src/types/position.enum';
import * as calculator from '../src/utils/loanCalculation.util';
import moment from 'moment';

test('calculates total amount with args: amount = 10000, term = 6, insurance = true  to equal 10250', () => {
  expect(calculator.calculateTotalAmount(10000, 6, true)).toBe(10250);
});

test('calculates rate proportion with args: rate = 9 to equal 0.0075', () => {
  expect(calculator.calculateRateProportion(9)).toBe(0.0075);
});

test('calculates monthly payment with args: amount = 10250, term = 6 months to equal 1753.46', () => {
  expect(calculator.calculateMonthlyPayment(10250, 6, 0.0075)).toBe(1753.46);
});

test('calculates total rate with args: total rate = 12, insurance =  false, salary proj = false, gender = male, age = 40, employment = employed, position = middleManager, maritalStatus = married, dependent = 0 to equal 10', () => {
  expect(
    calculator.calculateTotalRate(
      12,
      false,
      false,
      Gender.Male,
      40,
      EmploymentStatus.Employed,
      Position.MiddleManager,
      MaritalStatus.Married,
      0,
    ),
  ).toBe(10);
});

const paymentDates: Array<string> = [];
const paymentAmounts: Array<number> = [];
const firstDate = new Date();
const term = 4;
const monthlyPayment = 10000;
const totalAmount = 75000;
paymentAmounts.push(-totalAmount);
paymentDates.push(moment(firstDate).format('YYYY-MMM-DD'));
function addMonths(numOfMonths: number, date: Date): Date {
  const dateCopy = new Date(date.getTime());
  dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
  return dateCopy;
}

for (let index = 1; index < term + 1; index++) {
  paymentDates.push(moment(addMonths(1, new Date(paymentDates[index - 1]))).format('YYYY-MMM-DD'));
  paymentAmounts.push(monthlyPayment);
}

test('calculates psk with args: array dates [{today}, {today + 1m},  {today + 2m},  {today + 3m},   {today + 4m}], array payments 10000x4', () => {
  expect(calculator.calculatePSK(paymentDates, paymentAmounts)).toBe(0.001);
});

test('calculates age with args: date  = 2000-01-01', () => {
  expect(calculator.calculateAge(new Date('2000-01-01'))).toBe(new Date().getFullYear() - 2000);
});

test('rounds number  with args: number  = 100.74538570834', () => {
  expect(calculator.roundFunction(100.74538570834)).toBe(100.75);
});
