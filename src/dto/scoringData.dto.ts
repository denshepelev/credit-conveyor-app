import { EmploymentDTO } from "./employment.dto";
import { Gender } from "../types/gender.enum";
import { MaritalStatus } from "../types/maritalStatus.enum";

export interface ScoringDataDTO {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: Gender;
  birthDate: Date;
  passportSeries: string;
  passportNumber: string;
  passportIssueDate: Date;
  passportIssueBranch: string;
  maritalStatus: MaritalStatus;
  dependentAmount: number;
  employment: EmploymentDTO;
  account: string;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
}
