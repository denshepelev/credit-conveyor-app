import { PaymentScheduleElementDTO } from "./paymentScheduleElement.dto";

export interface CreditDTO {
  amount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  psk: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  paymentSchedule: Array<PaymentScheduleElementDTO>;
}
