import { MaritalStatus } from "../types/maritalStatus.enum";
import { Gender } from "../types/gender.enum";
import propertiesReader from "properties-reader";
import * as calculator from "../utils/loanCalculation.util";
import { EmploymentDTO } from "../dto/employment.dto";
import { ScoringDataDTO } from "../dto/scoringData.dto";
import { CreditDTO } from "../dto/credit.dto";

const rateProp = propertiesReader("src/credit-conveyor.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class CalculationService {
  private amount: number;
  private term: number;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private gender: Gender;
  private birthDate: Date;
  private passportSeries: string;
  private passportNumber: string;
  private passportIssueDate: Date;
  private passportIssueBranch: string;
  private maritalStatus: MaritalStatus;
  private dependentAmount: number;
  private employment: EmploymentDTO;
  private account: string;
  private isInsuranceEnabled: boolean;
  private isSalaryClient: boolean;
  private readonly BASE_RATE = Number(rateProp.get("rate"));
  scoringDataDTO: any;

  constructor(parameters: ScoringDataDTO) {
    this.amount = Number(parameters.amount);
    this.term = Number(parameters.term);
    this.firstName = parameters.firstName;
    this.lastName = parameters.lastName;
    this.middleName = parameters.middleName;
    this.gender = parameters.gender;
    this.birthDate = new Date(parameters.birthDate);
    this.passportSeries = parameters.passportSeries;
    this.passportNumber = parameters.passportNumber;
    this.passportIssueDate = parameters.passportIssueDate;
    this.passportIssueBranch = parameters.passportIssueBranch;
    this.maritalStatus = parameters.maritalStatus;
    this.dependentAmount = Number(parameters.dependentAmount);
    this.employment = {
      employmentStatus: parameters.employment.employmentStatus,
      employerINN: parameters.employment.employerINN,
      salary: Number(parameters.employment.salary),
      position: parameters.employment.position,
      workExperienceTotal: Number(parameters.employment.workExperienceTotal),
      workExperienceCurrent: Number(
        parameters.employment.workExperienceCurrent
      ),
    };
    this.account = parameters.account;
    this.isInsuranceEnabled = parameters.isInsuranceEnabled;
    this.isSalaryClient = parameters.isSalaryClient;
  }
  public getCredit(): CreditDTO {
    const roundFunction = (number: number) =>
      Math.round((number + Number.EPSILON) * 100) / 100;

    const totalAmount: number = calculator.calculateTotalAmount(
      this.amount,
      this.term,
      this.isInsuranceEnabled
    );

    const totalRate: number = calculator.calculateTotalRate(
      this.BASE_RATE,
      this.isInsuranceEnabled,
      this.isSalaryClient,
      this.gender,
      calculator.calculateAge(this.birthDate),
      this.employment.employmentStatus,
      this.employment.position,
      this.maritalStatus,
      this.dependentAmount
    );
    const rateProportion: number =
      calculator.calculateRateProportion(totalRate);
    const monthlyPayment: number = calculator.calculateMonthlyPayment(
      totalAmount,
      this.term,
      rateProportion
    );

    const paymentDates: Array<Date> = [];
    const paymentAmounts: Array<number> = [];
    paymentDates.push(new Date());
    paymentAmounts.push(-totalAmount);

    function addMonths(numOfMonths: number, date: Date): Date {
      const dateCopy = new Date(date.getTime());
      dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
      return dateCopy;
    }

    for (let index = 1; index < this.term + 1; index++) {
      paymentDates.push(addMonths(1, paymentDates[index - 1]));
      paymentAmounts.push(monthlyPayment);
    }

    const pskResult = calculator.calculatePSK(paymentDates, paymentAmounts);

    const credit: CreditDTO = {
      amount: totalAmount,
      term: this.term,
      monthlyPayment: monthlyPayment,
      rate: totalRate,
      psk: pskResult,
      isInsuranceEnabled: this.isInsuranceEnabled,
      isSalaryClient: this.isSalaryClient,
      paymentSchedule: [],
    };
    const startPayDay: Date = new Date();

    //вносим информацию о первом платеже
    credit.paymentSchedule.push({
      number: 1,
      date: startPayDay,
      totalPayment: roundFunction(
        monthlyPayment - totalAmount * rateProportion
      ),
      interestPayment: roundFunction(totalAmount * rateProportion),
      debtPayment: roundFunction(monthlyPayment - totalAmount * rateProportion),
      remainingDebt: roundFunction(
        totalAmount - monthlyPayment + totalAmount * rateProportion
      ),
    });
    /*
     *вносим информацию об остальных платежах используя
     * тип платежей «Аннуитетный» (каждый новый расчет использует данные из предыдущего платежа)
     */
    for (let index = 1; index < this.term; index++) {
      const paymentNumber: number = index + 1;
      const date: Date = addMonths(index, startPayDay);
      const totalPayment =
        credit.paymentSchedule[index - 1].totalPayment + monthlyPayment;
      const interestPayment =
        credit.paymentSchedule[index - 1].remainingDebt * rateProportion;
      const debtPayment = monthlyPayment - interestPayment;
      const remainingDebt =
        credit.paymentSchedule[index - 1].remainingDebt - debtPayment;
      credit.paymentSchedule.push({
        number: paymentNumber,
        date: date,
        totalPayment: roundFunction(totalPayment),
        interestPayment: roundFunction(interestPayment),
        debtPayment: roundFunction(debtPayment),
        remainingDebt: roundFunction(remainingDebt),
      });
    }
    return credit;
  }
}
