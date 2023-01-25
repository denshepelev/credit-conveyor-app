import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { PaymentScheduleElementDTO } from './paymentScheduleElement.dto.js';

export interface CreditDTO {
  amount: number;
  term: number;
  monthlyPayment: number;
  rate: number;
  psk: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  paymentSchedule: Array<PaymentScheduleElementDTO>;
  status: ApplicationStatus;
  error: string;
}
