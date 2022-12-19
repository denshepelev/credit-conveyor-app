import { Request, Response } from "express";
import { ConveyorRejectionError } from "../errors/conveyorRejection.error";
import { CalculationService } from "../services/calculation.service";
import { CreditStatus } from "../types/creditStatus.enum";

const calculationService = new CalculationService();

const getCalculationResult = async (req: Request, res: Response) => {
  try {
    const calculationResult = calculationService.getCredit(req.body);
    res.status(200).send(JSON.stringify(calculationResult));
  } catch (error: any) {
    if (error instanceof ConveyorRejectionError) {
      res
        .status(200)
        .send({ status: CreditStatus.CC_DENIED, error: error.message });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
};
export { getCalculationResult };
