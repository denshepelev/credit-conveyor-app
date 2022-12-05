export class PaymentScheduleElementDTO {
  private paymentNumber: number;
  private date: Date;
  private totalPayment: number;
  private interestPayment: number;
  private debtPayment: number;
  private remainingDebt: number;

  constructor(
    paymentNumber: number,
    date: Date,
    totalPayment: number,
    interestPayment: number,
    debtPayment: number,
    remainingDebt: number
  ) {
    this.paymentNumber = paymentNumber;
    this.date = date;
    this.totalPayment = totalPayment;
    this.interestPayment = interestPayment;
    this.debtPayment = debtPayment;
    this.remainingDebt = remainingDebt;
  }
  getRemainingDebt(): number {
    return this.remainingDebt;
  }
  getTotalPayment(): number {
    return this.totalPayment;
  }
}
