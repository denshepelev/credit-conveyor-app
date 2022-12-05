import { LoanApplicationRequestDTO } from "../dto/loanApplicationRequest.dto";
import { LoanOfferDTO } from "../dto/loanOffer.dto";
import propertiesReader from "properties-reader";
import { loanCalculator } from "./loanCalculator";

const rateProp = propertiesReader("src/credit-conveyor.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class LoanScorer {
  private loanApplicationRequestDTO: LoanApplicationRequestDTO;
  private loanOfferDTOList: Array<LoanOfferDTO>;
  private loanParams: Array<string> = ["00", "01", "10", "11"];
  private RATE_INSURANCE = 3;
  private INSURANCE_PERCENTAGE = 5;
  private RATE_SALARY = 1;
  private BASE_RATE = Number(rateProp.get("rate"));
  constructor(loanApplicationRequestDTO: LoanApplicationRequestDTO) {
    this.loanOfferDTOList = [];
    this.loanApplicationRequestDTO = loanApplicationRequestDTO;
  }
  getLoanOfferDTOList(): Array<LoanOfferDTO> {
    for (let i = 0; i < this.loanParams.length; i++) {
      this.loanOfferDTOList.push(
        this.getLoanOfferDTO(
          i,
          this.loanApplicationRequestDTO.getAmount(),
          this.loanApplicationRequestDTO.getTerm(),
          Boolean(parseInt([...this.loanParams[i]][0])),
          Boolean(parseInt([...this.loanParams[i]][1]))
        )
      );
    }
    return this.loanOfferDTOList.sort((n1, n2) => n1.getRate() - n2.getRate());
  }
  getLoanOfferDTO(
    applicationId: number,
    amount: number,
    term: number,
    rateInsuranceFactor: boolean,
    rateSalaryFactor: boolean
  ): LoanOfferDTO {
    let totalAmount: number = amount;
    if (rateInsuranceFactor) {
      totalAmount +=
        totalAmount * (this.INSURANCE_PERCENTAGE / 100) * (term / 12);
    }
    const rateInsurance: number = rateInsuranceFactor ? this.RATE_INSURANCE : 0;
    const rateSalary: number = rateSalaryFactor ? this.RATE_SALARY : 0;
    const totalRate: number = this.BASE_RATE - rateInsurance - rateSalary;
    /*const rateProportion: number = totalRate / 100 / 12;
    const monthlyPayment: number =
      Math.round(
        totalAmount *
          (rateProportion +
            rateProportion / (Math.pow(1 + rateProportion, term) - 1)) *
          100
      ) / 100;*/
    const monthlyPayment = loanCalculator(totalRate, totalAmount, term);
    return new LoanOfferDTO(
      applicationId,
      this.loanApplicationRequestDTO.getAmount(),
      totalAmount,
      term,
      monthlyPayment,
      totalRate,
      rateInsuranceFactor,
      rateSalaryFactor
    );
  }
}
