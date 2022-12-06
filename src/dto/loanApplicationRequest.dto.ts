export interface LoanApplicationRequestDTO {
  readonly amount: number;
  readonly term: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly email: string;
  readonly birthDate: Date;
  readonly passportSeries: string;
  readonly passportNumber: string;
}
