import { EmploymentStatus } from "../types/employmentStatus.enum";
import { Position } from "../types/position.enum";

export interface EmploymentDTO {
  employmentStatus: EmploymentStatus;
  employerINN: string;
  salary: number;
  position: Position;
  workExperienceTotal: number;
  workExperienceCurrent: number;
}
