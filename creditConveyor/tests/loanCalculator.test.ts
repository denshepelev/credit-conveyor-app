import { EmploymentStatus } from "../src/types/employmentStatus.enum";
import { Gender } from "../src/types/gender.enum";
import { MaritalStatus } from "../src/types/maritalStatus.enum";
import { Position } from "../src/types/position.enum";
import * as calculator from "../src/utils/loanCalculation.util";

test("calculates total amount with args: amount = 10000, term = 6, insurance = true  to equal 10250", () => {
  expect(calculator.calculateTotalAmount(10000, 6, true)).toBe(10250);
});

test("calculates rate proportion with args: rate = 9 to equal 0.0075", () => {
  expect(calculator.calculateRateProportion(9)).toBe(0.0075);
});

test("calculates monthly payment with args: amount = 10250, term = 6 months to equal 1753.46", () => {
  expect(calculator.calculateMonthlyPayment(10250, 6, 0.0075)).toBe(1753.46);
});

test("calculates total rate with args: total rate = 12, insurance =  false, salary proj = false, gender = male, age = 40, employment = employed, position = middleManager, maritalStatus = married, dependent = 0 to equal 10", () => {
  expect(calculator.calculateTotalRate(12,false,false,Gender.Male, 40, EmploymentStatus.Employed, Position.MiddleManager, MaritalStatus.Married, 0)).toBe(10);
});
