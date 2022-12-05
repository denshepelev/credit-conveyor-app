export class LoanOfferDTO {
  private applicationId: number;
  private requestedAmount: number;
  private totalAmount: number;
  private term: number;
  private monthlyPayment: number;
  private rate: number;
  private isInsuranceEnabled: boolean;
  private isSalaryClient: boolean;
  constructor(
    applicationId: number,
    requestedAmount: number,
    totalAmount: number,
    term: number,
    monthlyPayment: number,
    rate: number,
    isInsuranceEnabled: boolean,
    isSalaryClient: boolean
  ) {
    this.applicationId = applicationId;
    this.requestedAmount = requestedAmount;
    this.totalAmount = totalAmount;
    this.term = term;
    this.monthlyPayment = monthlyPayment;
    this.rate = rate;
    this.isInsuranceEnabled = isInsuranceEnabled;
    this.isSalaryClient = isSalaryClient;
  }
  getMonthlyPayment(): number {
    return this.monthlyPayment;
  }
  setApplicationId(applicationId: number) {
    this.applicationId = applicationId;
  }
  getRate(): number {
    return this.rate;
  }
}
