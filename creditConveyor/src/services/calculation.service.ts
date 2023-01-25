import propertiesReader from 'properties-reader';
import * as calculator from '../utils/loanCalculation.util.js';
import * as rejectionRules from '../utils/rejectionRules.util.js';
import { ScoringDataDTO } from '../dto/scoringData.dto.js';
import { CreditDTO } from '../dto/credit.dto.js';
import { EmploymentDTO } from '../dto/employment.dto.js';
import { validateSync, ValidationError } from 'class-validator';
import { ConveyorValidationError } from '../errors/conveyorValidation.error.js';
import moment from 'moment';

const rateProp = propertiesReader('src/app.properties', 'utf-8', {
  allowDuplicateSections: true,
});

export class CalculationService {
  private readonly BASE_RATE = Number(rateProp.get('rate'));

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
    scoringDataDTO.firstPayment = parameters.firstPayment;

    const employmentDTO = new EmploymentDTO();

    employmentDTO.employmentStatus = parameters.employment.employmentStatus;
    employmentDTO.employerINN = parameters.employment.employerINN;
    employmentDTO.salary = parameters.employment.salary;
    employmentDTO.position = parameters.employment.position;
    employmentDTO.workExperienceTotal = parameters.employment.workExperienceTotal;
    employmentDTO.workExperienceCurrent = parameters.employment.workExperienceCurrent;

    scoringDataDTO.employment = employmentDTO;

    //👇 validation block for input data 👇
    const errors: Array<ValidationError> = validateSync(scoringDataDTO, {
      validationError: { target: false, value: false },
      stopAtFirstError: true,
    });
    if (errors.length > 0) {
      throw new ConveyorValidationError(JSON.stringify(errors[0].constraints));
    }
    //👆 validation block for input data 👆

    // 👇 Checking block according conveyor rules 👇
    rejectionRules.checkAgeLimits(calculator.calculateAge(new Date(Date.parse(scoringDataDTO.birthDate))));
    rejectionRules.checkEmploymentStatus(scoringDataDTO.employment.employmentStatus);
    rejectionRules.checkMaxAmount(scoringDataDTO.amount, scoringDataDTO.employment.salary);
    rejectionRules.checkWorkExperienceCurrent(scoringDataDTO.employment.workExperienceCurrent);
    rejectionRules.checkWorkExperienceTotal(scoringDataDTO.employment.workExperienceTotal);
    // 👆 checking block according conveyor rules 👆

    const roundFunction = (number: number) => Math.round((number + Number.EPSILON) * 100) / 100;

    const totalAmount: number = calculator.calculateTotalAmount(
      scoringDataDTO.amount,
      scoringDataDTO.term,
      scoringDataDTO.isInsuranceEnabled,
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
      scoringDataDTO.dependentAmount,
    );
    const rateProportion: number = calculator.calculateRateProportion(totalRate);
    const monthlyPayment: number = calculator.calculateMonthlyPayment(totalAmount, scoringDataDTO.term, rateProportion);

    const paymentDates: Array<string> = [];
    const paymentAmounts: Array<number> = [];

    let startDate: string;

    try {
      if (scoringDataDTO.firstPayment && typeof scoringDataDTO.firstPayment === 'string') {
        startDate = scoringDataDTO.firstPayment;
      } else {
        startDate = moment(new Date()).format('YYYY-MM-DD');
      }
    } catch (error) {
      throw new ConveyorValidationError('Start payment date parse problem');
    }

    paymentDates.push(startDate);

    paymentAmounts.push(-totalAmount);

    function addMonths(numOfMonths: number, date: Date): Date {
      const dateCopy = new Date(date.getTime());
      dateCopy.setMonth(dateCopy.getMonth() + numOfMonths);
      return dateCopy;
    }

    for (let index = 1; index < scoringDataDTO.term + 1; index++) {
      paymentDates.push(moment(addMonths(1, new Date(paymentDates[index - 1]))).format('YYYY-MM-DD'));
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

    const startPayDay: Date = new Date(startDate);
    /*
    if (typeof scoringDataDTO.firstPayment === 'string') {
      startPayDay = new Date(scoringDataDTO.firstPayment);
    } else {
      startPayDay = new Date();
    }*/

    //💲 add first payment parameters into paymentScheduleElement for next calculations
    credit.paymentSchedule.push({
      number: 1,
      date: moment(startPayDay).format('YYYY-MM-DD'),
      totalPayment: roundFunction(monthlyPayment - totalAmount * rateProportion),
      interestPayment: roundFunction(totalAmount * rateProportion),
      debtPayment: roundFunction(monthlyPayment - totalAmount * rateProportion),
      remainingDebt: roundFunction(totalAmount - monthlyPayment + totalAmount * rateProportion),
    });
    /*
     * 💲 add next payments into paymentScheduleElement according to our schedule
     * 💲 credit type:  - Fixed annuities (with fixed payments)
     */
    for (let index = 1; index < scoringDataDTO.term; index++) {
      const paymentNumber: number = index + 1;
      const date: string = moment(addMonths(index, startPayDay)).format('YYYY-MM-DD');
      const totalPayment = credit.paymentSchedule[index - 1].totalPayment + monthlyPayment;
      const interestPayment = credit.paymentSchedule[index - 1].remainingDebt * rateProportion;
      const debtPayment = monthlyPayment - interestPayment;
      const remainingDebt = credit.paymentSchedule[index - 1].remainingDebt - debtPayment;
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
