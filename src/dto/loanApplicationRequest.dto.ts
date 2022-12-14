import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { MinAge } from "../validation/validation.decorator";

export class LoanApplicationRequestDTO {
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
  @IsEmail()
  email!: string;
  @IsDefined()
  @IsDateString()
  @MinAge(18)
  birthDate!: string;
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
}
