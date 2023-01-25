import { CreditStatus } from '../types/creditStatus.enum.js';
import { PaymentScheduleElementDTO } from '../dto/paymentScheduleElement.dto.js';

export interface Credit {
  amount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  psk: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  paymentSchedule: Array<PaymentScheduleElementDTO>;
  status: CreditStatus;
}
