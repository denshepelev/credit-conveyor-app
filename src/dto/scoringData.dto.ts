import { EmploymentDTO } from "./employment.dto";
import { Gender } from "../types/gender.enum";
import { MaritalStatus } from "../types/maritalStatus.enum";

export class ScoringDataDTO {
  private amount: number;
  private term: number;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private gender: Gender;
  private birthDate: Date;
  private passportSeries: string;
  private passportNumber: string;
  private passportIssueDate: Date;
  private passportIssueBranch: string;
  private maritalStatus: MaritalStatus;
  private dependentAmount: number;
  private employment: EmploymentDTO;
  private account: string;
  private isInsuranceEnabled: boolean;
  private isSalaryClient: boolean;
  constructor(
    amount: number,
    term: number,
    firstName: string,
    lastName: string,
    middleName: string,
    gender: Gender,
    birthDate: Date,
    passportSeries: string,
    passportNumber: string,
    passportIssueDate: Date,
    passportIssueBranch: string,
    maritalStatus: MaritalStatus,
    dependentAmount: number,
    employment: EmploymentDTO,
    account: string,
    isInsuranceEnabled: boolean,
    isSalaryClient: boolean
  ) {
    this.amount = amount;
    this.term = term;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.gender = gender;
    this.birthDate = birthDate;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
    this.passportIssueDate = passportIssueDate;
    this.passportIssueBranch = passportIssueBranch;
    this.maritalStatus = maritalStatus;
    this.dependentAmount = dependentAmount;
    this.employment = employment;
    this.account = account;
    this.isInsuranceEnabled = isInsuranceEnabled;
    this.isSalaryClient = isSalaryClient;
  }

  getAmount(): number {
    return this.amount;
  }
  getTerm(): number {
    return this.term;
  }
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getMiddleName(): string {
    return this.middleName;
  }
  getGender(): Gender {
    return this.gender;
  }
  getBirthDate(): Date {
    return this.birthDate;
  }
  getPassportSeries(): string {
    return this.passportSeries;
  }
  getPassportNumber(): string {
    return this.passportNumber;
  }
  getPassportIssueDate(): Date {
    return this.passportIssueDate;
  }
  getPassportIssueBranch(): string {
    return this.passportIssueBranch;
  }
  getMaritalStatus(): MaritalStatus {
    return this.maritalStatus;
  }
  getDependentAmount(): number {
    return this.dependentAmount;
  }
  getEmployment(): EmploymentDTO {
    return this.employment;
  }
  getAccount(): string {
    return this.account;
  }
  getIsInsuranceEnabled(): boolean {
    return this.isInsuranceEnabled;
  }
  getIsSalaryClient(): boolean {
    return this.isSalaryClient;
  }
}
