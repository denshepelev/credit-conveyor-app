import { ConveyorRejectionError } from '../errors/conveyorRejection.error.js';
import { EmploymentStatus } from '../types/employmentStatus.enum.js';

const checkEmploymentStatus = (status: EmploymentStatus): void => {
  if (status == EmploymentStatus.Unemployed) {
    throw new ConveyorRejectionError(`you can't apply for a credit in ${EmploymentStatus.Unemployed} status`);
  }
};

const checkMaxAmount = (requestedAmount: number, salary: number): void => {
  const salaryFactor = 20;
  if (requestedAmount > salary * salaryFactor) {
    throw new ConveyorRejectionError(`requested amount must be less then ${salaryFactor} salaries`);
  }
};

const checkAgeLimits = (age: number): void => {
  const minAge = 20;
  const maxAge = 60;
  if (age < minAge || age > maxAge) {
    throw new ConveyorRejectionError(
      `age must be greater than or equal ${minAge} years and less than  or equal ${maxAge} years`,
    );
  }
};

const checkWorkExperienceTotal = (workExperienceTotal: number): void => {
  const experienceTotal = 12;
  if (workExperienceTotal < experienceTotal) {
    throw new ConveyorRejectionError(`total working experience must be greater or equal ${experienceTotal} months`);
  }
};

const checkWorkExperienceCurrent = (workExperienceCurrent: number): void => {
  const experienceCurrent = 6;
  if (workExperienceCurrent < experienceCurrent) {
    throw new ConveyorRejectionError(`current working experience must be greater or equal ${experienceCurrent} months`);
  }
};

export { checkEmploymentStatus, checkMaxAmount, checkAgeLimits, checkWorkExperienceTotal, checkWorkExperienceCurrent };
