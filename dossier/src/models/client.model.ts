import { EmploymentDTO } from '../dto/employment.dto.js';
import { Gender } from '../types/gender.enum.js';
import { MaritalStatus } from '../types/maritalStatus.enum.js';

export interface Client {
  clientID: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date;
  email: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  dependentAmount: number;
  passportID: string;
  employmentID: EmploymentDTO;
  account: string;
}
