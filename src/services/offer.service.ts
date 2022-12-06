import propertiesReader from "properties-reader";
import * as calculator from "../utils/loanCalculation.util";
import { LoanApplicationRequestDTO } from "../dto/loanApplicationRequest.dto";
import { LoanOfferDTO } from "../dto/loanOffer.dto";

const rateProp = propertiesReader("src/credit-conveyor.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class OfferService {
  private amount: number;
  private term: number;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private email: string;
  private birthDate: Date;
  private passportSeries: string;
  private passportNumber: string;
  private loanOfferDTOList: Array<LoanOfferDTO>;
  private readonly BASE_RATE = Number(rateProp.get("rate"));

  constructor(parameters: LoanApplicationRequestDTO) {
    this.amount = Number(parameters.amount);
    this.term = Number(parameters.term);
    this.firstName = parameters.firstName;
    this.lastName = parameters.lastName;
    this.middleName = parameters.middleName;
    this.email = parameters.email;
    this.birthDate = parameters.birthDate;
    this.passportSeries = parameters.passportSeries;
    this.passportNumber = parameters.passportNumber;
    this.loanOfferDTOList = [];
  }

  /**
   * get offer list
   */
  public getLoanOfferDTOList(): Array<LoanOfferDTO> {
    //case_1: Insurance = false, SalaryClient = false;
    this.addOffer(1, this.amount, this.term, false, false);

    //case_2: Insurance = true, SalaryClient = false;
    this.addOffer(2, this.amount, this.term, true, false);

    //case_3: Insurance = true, SalaryClient = false;
    this.addOffer(3, this.amount, this.term, false, true);

    //case_4: Insurance = true, SalaryClient = false;
    this.addOffer(4, this.amount, this.term, true, true);

    return this.loanOfferDTOList.sort((n1, n2) => n1.rate - n2.rate);
  }

  private addOffer(
    applicationId: number,
    amount: number,
    term: number,
    isInsuranceEnabled: boolean,
    isSalaryClient: boolean
  ) {
    const totalAmount = calculator.calculateTotalAmount(
      amount,
      term,
      isInsuranceEnabled
    );

    const totalRate = calculator.calculateTotalRate(
      this.BASE_RATE,
      isInsuranceEnabled,
      isSalaryClient
    );

    const rateProportion = calculator.calculateRateProportion(totalRate);

    const monthlyPayment = calculator.calculateMonthlyPayment(
      totalAmount,
      term,
      rateProportion
    );

    this.loanOfferDTOList.push({
      applicationId: applicationId,
      requestedAmount: amount,
      totalAmount: totalAmount,
      term: term,
      monthlyPayment: monthlyPayment,
      rate: totalRate,
      isInsuranceEnabled: isInsuranceEnabled,
      isSalaryClient: isSalaryClient,
    });
  }
}
