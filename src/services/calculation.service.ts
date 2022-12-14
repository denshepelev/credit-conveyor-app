import propertiesReader from "properties-reader";
import * as calculator from "../utils/loanCalculation.util";
import { ScoringDataDTO } from "../dto/scoringData.dto";
import { CreditDTO } from "../dto/credit.dto";
import { EmploymentDTO } from "../dto/employment.dto";
import { validateSync, ValidationError } from "class-validator";

const rateProp = propertiesReader("src/app.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class CalculationService {
  private readonly BASE_RATE = Number(rateProp.get("rate"));

  public getCredit(parameters: ScoringDataDTO): CreditDTO {
    const scoringDataDTO: ScoringDataDTO = new ScoringDataDTO();

    scoringDataDTO.amount = parameters.amount;
    scoringDataDTO.term = parameters.term;
    scoringDataDTO.firstName = parameters.firstName;
    scoringDataDTO.lastName = parameters.lastName;
    scoringDataDTO.middleName = parameters.middleName;
    scoringDataDTO.gender = parameters.gender;
    scoringDataDTO.birthDate = parameters.birthDate;
    scoringDataDTO.passportSeries = parameters.passportSeries;
    scoringDataDTO.passportNumber = parameters.passportNumber;
    scoringDataDTO.passportIssueDate = parameters.passportIssueDate;
    scoringDataDTO.passportIssueBranch = parameters.passportIssueBranch;
    scoringDataDTO.maritalStatus = parameters.maritalStatus;
    scoringDataDTO.dependentAmount = parameters.dependentAmount;
    scoringDataDTO.account = parameters.account;
    scoringDataDTO.isInsuranceEnabled = parameters.isInsuranceEnabled;
    scoringDataDTO.isSalaryClient = parameters.isSalaryClient;

    const employmentDTO = new EmploymentDTO();

    employmentDTO.employmentStatus = parameters.employment.employmentStatus;
    employmentDTO.employerINN = parameters.employment.employerINN;
    employmentDTO.salary = parameters.employment.salary;
    employmentDTO.position = parameters.employment.position;
    employmentDTO.workExperienceTotal =
      parameters.employment.workExperienceTotal;
    employmentDTO.workExperienceCurrent =
      parameters.employment.workExperienceCurrent;

    scoringDataDTO.employment = employmentDTO;

    const errors: Array<ValidationError> = validateSync(scoringDataDTO, {
      validationError: { target: false },
      stopAtFirstError: false,
    });

    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
    }

    const roundFunction = (number: number) =>
      Math.round((number + Number.EPSILON) * 100) / 100;

    const totalAmount: number = calculator.calculateTotalAmount(
      scoringDataDTO.amount,
      scoringDataDTO.term,
      scoringDataDTO.isInsuranceEnabled
    );

    const totalRate: number = calculator.calculateTotalRate(
      this.BASE_RATE,
      scoringDataDTO.isInsuranceEnabled,
      scoringDataDTO.isSalaryClient,
      scoringDataDTO.gender,
      calculator.calculateAge(new Date(scoringDataDTO.birthDate)),
      scoringDataDTO.employment.employmentStatus,
      scoringDataDTO.employment.position,
      scoringDataDTO.maritalStatus,
      scoringDataDTO.dependentAmount
    );
    const rateProportion: number =
      calculator.calculateRateProportion(totalRate);
    const monthlyPayment: number = calculator.calculateMonthlyPayment(
      totalAmount,
      scoringDataDTO.term,
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

    for (let index = 1; index < scoringDataDTO.term + 1; index++) {
      paymentDates.push(addMonths(1, paymentDates[index - 1]));
      paymentAmounts.push(monthlyPayment);
    }

    const pskResult = calculator.calculatePSK(paymentDates, paymentAmounts);

    const credit: CreditDTO = {
      amount: totalAmount,
      term: scoringDataDTO.term,
      monthlyPayment: monthlyPayment,
      rate: totalRate,
      psk: pskResult,
      isInsuranceEnabled: scoringDataDTO.isInsuranceEnabled,
      isSalaryClient: scoringDataDTO.isSalaryClient,
      paymentSchedule: [],
    };
    const startPayDay: Date = new Date();

    //add first payment parameters into paymentScheduleElement for next calculations
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
     * add next payments into paymentScheduleElement according to our schedule
     * credit type:  - Fixed annuities (with fixed payments)
     */
    for (let index = 1; index < scoringDataDTO.term; index++) {
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
