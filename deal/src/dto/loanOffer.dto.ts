import { IsBoolean, IsDefined, IsNumber } from 'class-validator';

export class LoanOfferDTO {
  @IsDefined()
  @IsNumber()
  applicationId!: number;
  @IsDefined()
  @IsNumber()
  requestedAmount!: number;
  @IsDefined()
  @IsNumber()
  totalAmount!: number;
  @IsDefined()
  @IsNumber()
  term!: number;
  monthlyPayment!: number;
  @IsDefined()
  @IsNumber()
  rate!: number;
  @IsDefined()
  @IsBoolean()
  isInsuranceEnabled!: boolean;
  @IsDefined()
  @IsBoolean()
  isSalaryClient!: boolean;
}
