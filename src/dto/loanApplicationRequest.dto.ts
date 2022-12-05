export class LoanApplicationRequestDTO {
  private amount: number;
  private term: number;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private email: string;
  private birthDate: Date;
  private passportSeries: string;
  private passportNumber: string;
  constructor(
    amount: number,
    term: number,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    birthDate: Date,
    passportSeries: string,
    passportNumber: string
  ) {
    this.amount = amount;
    this.term = term;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.email = email;
    this.birthDate = birthDate;
    this.passportSeries = passportSeries;
    this.passportNumber = passportNumber;
  }
  getAmount(): number {
    return this.amount;
  }
  getTerm(): number {
    return this.term;
  }
}
