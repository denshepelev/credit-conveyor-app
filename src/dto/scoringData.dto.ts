import { EmploymentDTO } from "./employment.dto";
import { Gender } from "../types/gender.enum";
import { MaritalStatus } from "../types/maritalStatus.enum";
import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { MinAge } from "../validation/validation.decorator";

export class ScoringDataDTO {
  @IsDefined()
  @IsNumber()
  @Min(10000)
  amount!: number;
  @IsDefined()
  @IsNumber()
  @Min(6)
  term!: number;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName!: string;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName!: string;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  middleName!: string;
  @IsDefined()
  @IsString()
  gender!: Gender;
  @IsDefined()
  @IsDateString()
  @MinAge(18)
  birthDate!: Date;
  @IsDefined()
  @IsString()
  @Length(4, 4, {
    message: "passport series should be four digits long",
  })
  passportSeries!: string;
  @IsDefined()
  @IsString()
  @Length(6, 6, {
    message: "passport number should be six digits long",
  })
  passportNumber!: string;
  @IsDefined()
  @IsDateString()
  passportIssueDate!: string;
  @IsDefined()
  @IsString()
  passportIssueBranch!: string;
  @IsDefined()
  @IsString()
  maritalStatus!: MaritalStatus;
  @IsDefined()
  @IsNumber()
  dependentAmount!: number;
  @ValidateNested()
  employment!: EmploymentDTO;
  @IsDefined()
  @IsString()
  account!: string;
  @IsDefined()
  @IsBoolean()
  isInsuranceEnabled!: boolean;
  @IsDefined()
  @IsBoolean()
  isSalaryClient!: boolean;
}
