import { EmploymentStatus } from "../types/employmentStatus.enum";
import { Gender } from "../types/gender.enum";
import { MaritalStatus } from "../types/maritalStatus.enum";
import { Position } from "../types/position.enum";

const calculateMonthlyPayment = (
  totalAmount: number,
  term: number,
  rateProportion: number
): number => {
  const monthlyPayment: number =
    Math.round(
      totalAmount *
        (rateProportion +
          rateProportion / (Math.pow(1 + rateProportion, term) - 1)) *
        100
    ) / 100;
  return monthlyPayment;
};

const calculateRateProportion = (totalRate: number): number => {
  return totalRate / 100 / 12;
};

const calculateTotalAmount = (
  amount: number,
  term: number,
  isInsuranceEnabled: boolean
): number => {
  if (isInsuranceEnabled) {
    const INSURANCE_PERCENTAGE = 5;
    const totalAmount =
      amount + amount * (INSURANCE_PERCENTAGE / 100) * (term / 12);
    return totalAmount;
  }
  return amount;
};

const calculateTotalRate = (
  baseRate: number,
  isInsuranceEnabled: boolean,
  isSalaryClient: boolean,
  gender?: Gender,
  age?: number,
  employmentStatus?: EmploymentStatus,
  position?: Position,
  maritalStatus?: MaritalStatus,
  dependentAmount?: number
): number => {
  const INSURANCE_RATE = -2;
  const SALARY_RATE = -1;
  const MALE_RATE = 0;
  const MALE_RISK_AGE = 1;
  const MALE_MIN_FINE_AGE = 25;
  const MALE_MAX_FINE_AGE = 50;
  const FEMALE_RATE = 0;
  const FEMALE_RISK_AGE = 1.5;
  const FEMALE_MIN_FINE_AGE = 25;
  const FEMALE_MAX_FINE_AGE = 40;
  const NON_BINARY_RATE = 7;
  const SELF_EMPLOYED_RATE = 2;
  const BUSINESS_OWNER_RATE = 3;
  const MIDDLE_MANAGER_RATE = -1;
  const TOP_MANAGER_RATE = -2;
  const DIVORCED_RATE = 1;
  const WIDOW_WIDOWER_RATE = 1;
  const MARRIED_RATE = -1;
  const DEPENDENT_AVAILABLE = 1;
  const DEPENDENT_PENALTY_RATE = 1;

  const insuranceRate: number = isInsuranceEnabled ? INSURANCE_RATE : 0;
  const salaryRate: number = isSalaryClient ? SALARY_RATE : 0;
  let genderRate: number;
  let employerRate: number;
  let positionRate: number;
  let maritalStatusRate: number;
  let dependentRate: number;

  if (age && gender) {
    if (
      gender == Gender.Male ||
      gender == Gender.Female ||
      gender == Gender.NonBinary
    ) {
      if (gender == Gender.NonBinary) {
        genderRate = NON_BINARY_RATE;
      } else genderRate = 0;
      if (gender == Gender.Male) {
        if (age > MALE_MIN_FINE_AGE && age < MALE_MAX_FINE_AGE) {
          genderRate = MALE_RATE;
        } else {
          genderRate = MALE_RISK_AGE;
        }
      }
      if (gender == Gender.Female) {
        if (age > FEMALE_MIN_FINE_AGE && age < FEMALE_MAX_FINE_AGE) {
          genderRate = FEMALE_RATE;
        } else {
          genderRate = FEMALE_RISK_AGE;
        }
      }
    } else {
      genderRate = 0;
    }
  } else {
    genderRate = 0;
  }

  switch (employmentStatus) {
    case EmploymentStatus.SelfEmployed:
      employerRate = SELF_EMPLOYED_RATE;
      break;
    case EmploymentStatus.BusinessOwner:
      employerRate = BUSINESS_OWNER_RATE;
      break;
    default:
      employerRate = 0;
      break;
  }

  switch (position) {
    case Position.MiddleManager:
      positionRate = MIDDLE_MANAGER_RATE;
      break;
    case Position.TopManager:
      positionRate = TOP_MANAGER_RATE;
      break;
    default:
      positionRate = 0;
      break;
  }

  switch (maritalStatus) {
    case MaritalStatus.Divorced:
      maritalStatusRate = DIVORCED_RATE;
      break;
    case MaritalStatus.WidowWidower:
      maritalStatusRate = WIDOW_WIDOWER_RATE;
      break;
    case MaritalStatus.Married:
      maritalStatusRate = MARRIED_RATE;
      break;
    default:
      maritalStatusRate = 0;
      break;
  }

  if (dependentAmount) {
    if (dependentAmount > DEPENDENT_AVAILABLE) {
      dependentRate = DEPENDENT_PENALTY_RATE;
    } else {
      dependentRate = 0;
    }
  } else {
    dependentRate = 0;
  }

  return (
    baseRate +
    insuranceRate +
    salaryRate +
    genderRate +
    employerRate +
    positionRate +
    maritalStatusRate +
    dependentRate
  );
};

const calculatePSK = function (dates: Array<Date>, sum: Array<number>): number {
  /*
   * the approximate calculation  method is used with an accuracy of two decimal places
   * incoming parameters: dates - payment dates
   * incoming parameters: sum - payment total sum
   */
  const m = dates.length; // число платежей

  //base period assignment bp
  const bp = 30;
  //calculate base period amount in year:
  const cbp = Math.round(365 / bp);

  //filling array with days amount since receiving credit to day ever incrementing k payment
  const days: Array<any> = [];
  for (let k = 0; k < m; k++) {
    days[k] = (dates[k].getTime() - dates[0].getTime()) / (24 * 60 * 60 * 1000);
  }

  //calculating Ек и Qк for each payment
  const e = [];
  const q = [];
  for (let k = 0; k < m; k++) {
    e[k] = (days[k] % bp) / bp;
    q[k] = Math.floor(days[k] / bp);
  }

  //checking each i in loop starting with 0 to best approximation using step s
  let i = 0;
  let x = 1;
  let x_m = 0;
  const s = 0.000001;
  while (x > 0) {
    x_m = x;
    x = 0;
    for (let k = 0; k < m; k++) {
      x = x + sum[k] / ((1 + e[k] * i) * Math.pow(1 + i, q[k]));
    }
    i = i + s;
  }
  if (x > x_m) {
    i = i - s;
  }

  //calculating psk result
  const psk = Math.floor(i * cbp * 100 * 1000) / 1000;

  return psk;
};

const calculateAge = (birthDate: Date): number => {
  const diffMs: number = Date.now() - birthDate.getTime();
  const ageDate: Date = new Date(diffMs);
  const age: number = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age;
};

const roundFunction = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

export {
  calculateMonthlyPayment,
  calculateRateProportion,
  calculateTotalAmount,
  calculateTotalRate,
  calculatePSK,
  calculateAge,
  roundFunction,
};
