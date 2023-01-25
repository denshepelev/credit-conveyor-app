import { IsDateString, IsDefined, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Gender } from '../types/gender.enum.js';
import { MaritalStatus } from '../types/maritalStatus.enum.js';
import { EmploymentDTO } from './employment.dto.js';

export class FinishRegistrationRequestDTO {
  @IsDefined()
  @IsString()
  gender!: Gender;
  @IsDefined()
  @IsString()
  maritalStatus!: MaritalStatus;
  @IsDefined()
  @IsNumber()
  dependentAmount!: number;
  @IsDefined()
  @IsDateString()
  passportIssueDate!: string;
  @IsDefined()
  @IsString()
  passportIssueBranch!: string;
  @ValidateNested()
  employment!: EmploymentDTO;
  @IsDefined()
  @IsString()
  account!: string;
}
