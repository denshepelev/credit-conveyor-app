import propertiesReader from "properties-reader";
import * as calculator from "../utils/loanCalculation.util";
import { LoanApplicationRequestDTO } from "../dto/loanApplicationRequest.dto";
import { LoanOfferDTO } from "../dto/loanOffer.dto";
import { validateSync, ValidationError } from "class-validator";
import { ConveyorValidationError } from "../errors/conveyorValidation.error";

const rateProp = propertiesReader("src/app.properties", "utf-8", {
  allowDuplicateSections: true,
});

export class OfferService {
  private readonly BASE_RATE = Number(rateProp.get("rate"));

  /**
   * get offer list
   */
  public getLoanOfferDTOList(
    parameters: LoanApplicationRequestDTO
  ): Array<LoanOfferDTO> {
    const loanOfferDTOList: Array<LoanOfferDTO> = [];

    const loanApplicationRequestDTO: LoanApplicationRequestDTO =
      new LoanApplicationRequestDTO();

    loanApplicationRequestDTO.amount = parameters.amount;
    loanApplicationRequestDTO.term = parameters.term;
    loanApplicationRequestDTO.firstName = parameters.firstName;
    loanApplicationRequestDTO.lastName = parameters.lastName;
    loanApplicationRequestDTO.middleName = parameters.middleName;
    loanApplicationRequestDTO.email = parameters.email;
    loanApplicationRequestDTO.birthDate = parameters.birthDate;
    loanApplicationRequestDTO.passportSeries = parameters.passportSeries;
    loanApplicationRequestDTO.passportNumber = parameters.passportNumber;

    const errors: Array<ValidationError> = validateSync(
      loanApplicationRequestDTO,
      {
        validationError: { target: false, value: false },
        stopAtFirstError: true,
      }
    );

    if (errors.length > 0) {
      //throw new Error(JSON.stringify(errors[0].constraints));
      throw new ConveyorValidationError(JSON.stringify(errors[0].constraints));
      //throw new ValidationError();
    }

    const addOffer = (
      applicationId: number,
      amount: number,
      term: number,
      isInsuranceEnabled: boolean,
      isSalaryClient: boolean
    ) => {
      const totalAmount: number = calculator.calculateTotalAmount(
        amount,
        term,
        isInsuranceEnabled
      );

      const totalRate = calculator.calculateTotalRate(
        this.BASE_RATE,
        isInsuranceEnabled,
        isSalaryClient
      );

      const rateProportion = calculator.calculateRateProportion(totalRate);

      const monthlyPayment = calculator.calculateMonthlyPayment(
        totalAmount,
        term,
        rateProportion
      );

      loanOfferDTOList.push({
        applicationId: applicationId,
        requestedAmount: amount,
        totalAmount: calculator.roundFunction(totalAmount),
        term: term,
        monthlyPayment: monthlyPayment,
        rate: totalRate,
        isInsuranceEnabled: isInsuranceEnabled,
        isSalaryClient: isSalaryClient,
      });
    };

    //case_1: Insurance = false, SalaryClient = false;
    addOffer(
      1,
      loanApplicationRequestDTO.amount,
      loanApplicationRequestDTO.term,
      false,
      false
    );

    //case_2: Insurance = true, SalaryClient = false;
    addOffer(
      2,
      loanApplicationRequestDTO.amount,
      loanApplicationRequestDTO.term,
      true,
      false
    );

    //case_3: Insurance = true, SalaryClient = false;
    addOffer(
      3,
      loanApplicationRequestDTO.amount,
      loanApplicationRequestDTO.term,
      false,
      true
    );

    //case_4: Insurance = true, SalaryClient = false;
    addOffer(
      4,
      loanApplicationRequestDTO.amount,
      loanApplicationRequestDTO.term,
      true,
      true
    );

    return loanOfferDTOList.sort((n1, n2) => n1.rate - n2.rate);
  }
}
