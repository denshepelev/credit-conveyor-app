export interface PaymentScheduleElementDTO {
  number: number;
  date: Date;
  totalPayment: number;
  interestPayment: number;
  debtPayment: number;
  remainingDebt: number;
}
