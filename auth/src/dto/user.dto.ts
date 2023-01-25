import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  @IsDefined()
  @IsString()
  @IsEmail()
  email!: string;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  password!: string;
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
  role!: string;
}
