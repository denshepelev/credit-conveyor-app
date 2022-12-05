import { EmploymentStatus } from "../types/employmentStatus.enum";

/*const checkPersonalData = (
  firstName: string,
  SecondName: string,
  middleName: string
) => {
  if (firstName.length === 0) {
    throw new Error("firstName is not correct");
  }
};*/
const checkAgeLimit = (birthDate: Date) => {
  const diffMs: number = Date.now() - birthDate.getTime();
  const ageDate: Date = new Date(diffMs);
  const age = Math.abs(ageDate.getFullYear() - 1970);
  if (age < 22 || age > 50) {
    throw new Error("forbidden age limit");
  } else
    console.log(
      `${typeof checkAgeLimit} ${checkAgeLimit.name}: All calculations DONE`
    );
};

const checkAmountLimit = (salary: number, amount: number) => {
  if (amount > salary * 25) {
    throw new Error(
      `forbidden amount limit. Should be less then ${salary * 25} $`
    );
  }
};

const checkJobPeriodLimit = (
  workExperienceCurrent: number,
  workExperienceTotal: number
) => {
  if (workExperienceCurrent < 6 && workExperienceTotal < 24) {
    throw new Error(
      "Your total working experience should be more then 24 months and current more then 6"
    );
  }
};

const checkUnemployedPerson = (employmentStatus: EmploymentStatus) => {
  if (employmentStatus == EmploymentStatus.Unemployed) {
    throw new Error("Loans available only to employed persons");
  }
};

//console.log(checkAgeLimit(new Date("1987-01-06")));
//checkAgeLimit(new Date("2005-01-06"));
checkAgeLimit(new Date(Date.parse("1987-01-06")));

export {
  checkAgeLimit,
  checkAmountLimit,
  checkJobPeriodLimit,
  checkUnemployedPerson,
};
