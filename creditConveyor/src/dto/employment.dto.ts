import {
  IsDefined,
  IsNumber,
  IsString,
  //Min,
  NotContains,
} from "class-validator";
import { EmploymentStatus } from "../types/employmentStatus.enum.js";
import { Position } from "../types/position.enum.js";

export class EmploymentDTO {
  @IsDefined()
  @IsString()
  @NotContains("UNEMPLOYED")
  employmentStatus!: EmploymentStatus;
  @IsDefined()
  @IsString()
  employerINN!: string;
  @IsDefined()
  @IsNumber()
  salary!: number;
  @IsDefined()
  @IsString()
  position!: Position;
  @IsDefined()
  @IsNumber()
  //@Min(12)
  workExperienceTotal!: number;
  @IsDefined()
  @IsNumber()
  //@Min(6)
  workExperienceCurrent!: number;
}
