import { ConveyorRejectionError } from '../src/errors/conveyorRejection.error';
import { EmploymentStatus } from '../src/types/employmentStatus.enum';
import * as rejectionRules from '../src/utils/rejectionRules.util';

test('should throw an error if called with arg EmploymentStatus.Unemployed', () => {
  expect(() => {
    rejectionRules.checkEmploymentStatus(EmploymentStatus.Unemployed);
    // Fail test if above expression doesn't throw anything.
  }).toThrow();
});

it("should throw Error with message 'CC denied, reason: you can't apply for a credit in UNEMPLOYED status' when arg EmploymentStatus.Unemployed", () => {
  try {
    rejectionRules.checkEmploymentStatus(EmploymentStatus.Unemployed);
    // Fail test if above expression doesn't throw anything or wrong message.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe("CC denied, reason: you can't apply for a credit in UNEMPLOYED status");
    } else if (e instanceof Error) {
      expect(e.message).toBe("CC denied, reason: you can't apply for a credit in UNEMPLOYED status");
    }
  }
});

test('should throw an error if called with args requestedAmount=200000, salary=5000', () => {
  expect(() => {
    rejectionRules.checkMaxAmount(200000, 5000);
  }).toThrow();
});

it('should throw an error if called with args requestedAmount=200000, salary=5000', () => {
  try {
    rejectionRules.checkMaxAmount(200000, 5000);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe('CC denied, reason: requested amount must be less then 20 salaries');
    } else if (e instanceof Error) {
      expect(e.message).toBe('CC denied, reason: requested amount must be less then 20 salaries');
    }
  }
});

const testAge = { minAge: 19, maxAge: 61 };

test(`should throw an error if called with args age=${testAge.minAge}`, () => {
  expect(() => {
    rejectionRules.checkAgeLimits(testAge.minAge);
  }).toThrow();
});

it(`should throw an error if called with args age=${testAge.minAge}`, () => {
  try {
    rejectionRules.checkAgeLimits(testAge.minAge);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe(
        'CC denied, reason: age must be greater than or equal 20 years and less than  or equal 60 years',
      );
    } else if (e instanceof Error) {
      expect(e.message).toBe('CC denied, age must be greater than or equal 20 years and less than  or equal 60 years');
    }
  }
});

test(`should throw an error if called with args age=${testAge.maxAge}`, () => {
  expect(() => {
    rejectionRules.checkAgeLimits(testAge.maxAge);
  }).toThrow();
});

it(`should throw an error if called with args age=${testAge.maxAge}`, () => {
  try {
    rejectionRules.checkAgeLimits(testAge.maxAge);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe(
        'CC denied, reason: age must be greater than or equal 20 years and less than  or equal 60 years',
      );
    } else if (e instanceof Error) {
      expect(e.message).toBe('CC denied, age must be greater than or equal 20 years and less than  or equal 60 years');
    }
  }
});

test(`should throw an error if called with args workExperienceTotal=11 months`, () => {
  expect(() => {
    rejectionRules.checkWorkExperienceTotal(11);
  }).toThrow();
});

it(`should throw an error if called with args workExperienceTotal=11 months`, () => {
  try {
    rejectionRules.checkWorkExperienceTotal(11);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe('CC denied, reason: total working experience must be greater or equal 12 months');
    } else if (e instanceof Error) {
      expect(e.message).toBe('CC denied, reason: total working experience must be greater or equal 12 months');
    }
  }
});

test(`should throw an error if called with args workExperienceCurrent=5 months`, () => {
  expect(() => {
    rejectionRules.checkWorkExperienceCurrent(5);
  }).toThrow();
});

it(`should throw an error if called with args workExperienceCurrent=5 months`, () => {
  try {
    rejectionRules.checkWorkExperienceCurrent(5);
    // Fail test if above expression doesn't throw anything.
    expect(true).toBe(false);
  } catch (e: unknown) {
    if (e instanceof ConveyorRejectionError) {
      expect(e.message).toBe('CC denied, reason: current working experience must be greater or equal 6 months');
    } else if (e instanceof Error) {
      expect(e.message).toBe('CC denied, reason: current working experience must be greater or equal 6 months');
    }
  }
});
