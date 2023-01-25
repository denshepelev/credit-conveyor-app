import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class Login {
  @IsDefined()
  @IsString()
  @IsEmail()
  email!: string;
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  password!: string;
}
