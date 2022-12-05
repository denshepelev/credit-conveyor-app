import { EmploymentStatus } from "../types/employmentStatus.enum";
import { Position } from "../types/position.enum";

export class EmploymentDTO {
  private employmentStatus: EmploymentStatus;
  private employerINN: string;
  private salary: number;
  private position: Position;
  private workExperienceTotal: number;
  private workExperienceCurrent: number;
  constructor(
    employmentStatus: EmploymentStatus,
    employerINN: string,
    salary: number,
    position: Position,
    workExperienceTotal: number,
    workExperienceCurrent: number
  ) {
    this.employmentStatus = employmentStatus;
    this.employerINN = employerINN;
    this.salary = salary;
    this.position = position;
    this.workExperienceTotal = workExperienceTotal;
    this.workExperienceCurrent = workExperienceCurrent;
  }
  getEmploymentStatus(): EmploymentStatus {
    return this.employmentStatus;
  }
  getEmployerINN(): string {
    return this.employerINN;
  }
  getSalary(): number {
    return this.salary;
  }
  getPosition(): Position {
    return this.position;
  }
  getWorkExperienceTotal(): number {
    return this.workExperienceTotal;
  }
  getWorkExperienceCurrent(): number {
    return this.workExperienceCurrent;
  }
}
