import { PaymentScheduleElementDTO } from "./paymentScheduleElement.dto";

export class CreditDTO {
  private amount: number;
  private term: number;
  private monthlyPayment: number;
  private rate: number;
  private psk: number;
  private isInsuranceEnabled: boolean;
  private isSalaryClient: boolean;
  private paymentSchedule: Array<PaymentScheduleElementDTO>;

  constructor(
    amount: number,
    term: number,
    monthlyPayment: number,
    rate: number,
    psk: number,
    isInsuranceEnabled: boolean,
    isSalaryClient: boolean
  ) {
    this.paymentSchedule = [];
    this.amount = amount;
    this.term = term;
    this.monthlyPayment = monthlyPayment;
    this.rate = rate;
    this.psk = psk;
    this.isInsuranceEnabled = isInsuranceEnabled;
    this.isSalaryClient = isSalaryClient;
  }

  addPayment(
    paymentNumber: number,
    date: Date,
    totalPayment: number,
    interestPayment: number,
    debtPayment: number,
    remainingDebt: number
  ) {
    this.paymentSchedule.push(
      new PaymentScheduleElementDTO(
        paymentNumber,
        date,
        totalPayment,
        interestPayment,
        debtPayment,
        remainingDebt
      )
    );
  }
  getPaymentSchedule(): Array<PaymentScheduleElementDTO> {
    return this.paymentSchedule;
  }
}
