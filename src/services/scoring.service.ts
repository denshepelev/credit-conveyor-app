import { CreditDTO } from "../dto/credit.dto";
import { ScoringDataDTO } from "../dto/scoringData.dto";
import * as clientValidator from "../utils/clientValidator";
import { EmploymentStatus } from "../types/employmentStatus.enum";
import { Position } from "../types/position.enum";
import { MaritalStatus } from "../types/maritalStatus.enum";
import { Gender } from "../types/gender.enum";
import propertiesReader from "properties-reader";
import { loanCalculator } from "../utils/loanCalculator";
import { psk } from "../utils/psk";

const rateProp = propertiesReader("src/credit-conveyor.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class ScoringService {
  private scoringDataDTO: ScoringDataDTO;
  private readonly BASE_RATE = Number(rateProp.get("rate"));
  private readonly INSURANCE_RATE = -3;
  private readonly INSURANCE_PERCENTAGE = 5;
  private readonly SALARY_RATE = -1;

  constructor(scoringDataDTO: ScoringDataDTO) {
    this.scoringDataDTO = scoringDataDTO;
    clientValidator.checkAgeLimit(scoringDataDTO.getBirthDate());
    clientValidator.checkAmountLimit(
      scoringDataDTO.getEmployment().getSalary(),
      scoringDataDTO.getAmount()
    );
    clientValidator.checkJobPeriodLimit(
      scoringDataDTO.getEmployment().getWorkExperienceCurrent(),
      scoringDataDTO.getEmployment().getWorkExperienceTotal()
    );
    clientValidator.checkUnemployedPerson(
      scoringDataDTO.getEmployment().getEmploymentStatus()
    );
  }
  public getCredit(): CreditDTO {
    let employerRate: number;
    let positionRate: number;
    let maritalStatusRate: number;
    let dependentRate: number;
    let genderRate: number;
    let totalAmount: number = this.scoringDataDTO.getAmount();
    const roundFunction = (number: number) =>
      Math.round((number + Number.EPSILON) * 100) / 100;

    if (this.scoringDataDTO.getIsInsuranceEnabled()) {
      totalAmount =
        this.scoringDataDTO.getAmount() +
        this.scoringDataDTO.getAmount() *
          (this.INSURANCE_PERCENTAGE / 100) *
          (this.scoringDataDTO.getTerm() / 12);
    }

    const insuranceRate: number = this.scoringDataDTO.getIsInsuranceEnabled()
      ? this.INSURANCE_RATE
      : 0;

    const salaryRate: number = this.scoringDataDTO.getIsSalaryClient()
      ? this.SALARY_RATE
      : 0;

    switch (this.scoringDataDTO.getEmployment().getEmploymentStatus()) {
      case EmploymentStatus.SelfEmployed:
        employerRate = 2;
        break;
      case EmploymentStatus.BusinessOwner:
        employerRate = 3;
        break;
      default:
        employerRate = 0;
        break;
    }

    switch (this.scoringDataDTO.getEmployment().getPosition()) {
      case Position.MiddleManager:
        positionRate = -2;
        break;
      case Position.TopManager:
        positionRate = -3;
        break;
      default:
        positionRate = 0;
        break;
    }

    switch (this.scoringDataDTO.getMaritalStatus()) {
      case MaritalStatus.Divorced:
        maritalStatusRate = 1;
        break;
      case MaritalStatus.WidowWidower:
        maritalStatusRate = 1;
        break;
      case MaritalStatus.Married:
        maritalStatusRate = -1;
        break;
      default:
        maritalStatusRate = 0;
        break;
    }

    switch (this.scoringDataDTO.getGender()) {
      case Gender.Male:
        genderRate = 1;
        break;
      case Gender.Female:
        genderRate = 1;
        break;
      default:
        genderRate = 7;
        break;
    }

    if (this.scoringDataDTO.getDependentAmount() > 1) {
      dependentRate = 1;
    } else {
      dependentRate = 0;
    }

    const totalRate: number =
      this.BASE_RATE +
      employerRate +
      positionRate +
      maritalStatusRate +
      dependentRate +
      genderRate +
      insuranceRate +
      salaryRate;

    const monthlyPayment: number = loanCalculator(
      totalRate,
      totalAmount,
      this.scoringDataDTO.getTerm()
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

    for (let index = 1; index < this.scoringDataDTO.getTerm() + 1; index++) {
      paymentDates.push(addMonths(1, paymentDates[index - 1]));
      paymentAmounts.push(monthlyPayment);
    }

    const pskResult = psk(paymentDates, paymentAmounts);

    const credit: CreditDTO = new CreditDTO(
      roundFunction(totalAmount),
      this.scoringDataDTO.getTerm(),
      roundFunction(monthlyPayment),
      totalRate,
      pskResult,
      this.scoringDataDTO.getIsInsuranceEnabled(),
      this.scoringDataDTO.getIsSalaryClient()
    );
    const startPayDay: Date = new Date();
    const rateProportion: number = totalRate / 100 / 12;

    //вносим информацию о первом платеже
    credit.addPayment(
      1,
      startPayDay,
      roundFunction(monthlyPayment - totalAmount * rateProportion),
      roundFunction(totalAmount * rateProportion),
      roundFunction(monthlyPayment - totalAmount * rateProportion),
      roundFunction(totalAmount - monthlyPayment + totalAmount * rateProportion)
    );

    for (let index = 1; index < this.scoringDataDTO.getTerm(); index++) {
      const paymentNumber: number = index + 1;
      const date: Date = addMonths(index, startPayDay);
      const totalPayment =
        credit.getPaymentSchedule()[index - 1].getTotalPayment() +
        monthlyPayment;
      const interestPayment =
        credit.getPaymentSchedule()[index - 1].getRemainingDebt() *
        rateProportion;
      const debtPayment = monthlyPayment - interestPayment;
      const remainingDebt =
        credit.getPaymentSchedule()[index - 1].getRemainingDebt() - debtPayment;

      credit.addPayment(
        paymentNumber,
        date,
        roundFunction(totalPayment),
        roundFunction(interestPayment),
        roundFunction(debtPayment),
        roundFunction(remainingDebt)
      );
    }
    return credit;
  }
}
/* //test code
const scoringService = new ScoringService(
  new ScoringDataDTO(
    20000,
    4,
    "Denis",
    "Shepelev",
    "Valerievich",
    Gender.Male,
    new Date("1987-06-28"),
    "6304",
    "555555",
    new Date("1987-06-28"),
    "passportIssueBranch",
    MaritalStatus.Single,
    0,
    new EmploymentDTO(
      EmploymentStatus.Employed,
      "63754782",
      150000,
      Position.MiddleManager,
      50,
      20
    ),
    "account",
    true,
    true
  )
);
console.log(scoringService.getCredit());*/
