import { Request, Response } from 'express';
import { ConveyorRejectionError } from '../errors/conveyorRejection.error.js';
import { ConveyorValidationError } from '../errors/conveyorValidation.error.js';
import { CalculationService } from '../services/calculation.service.js';
import { CreditStatus } from '../types/creditStatus.enum.js';
const calculationService = new CalculationService();

const getCalculationResult = async (req: Request, res: Response) => {
  try {
    const calculationResult = calculationService.getCredit(req.body);
    res.status(200).send(JSON.stringify(calculationResult));
  } catch (error: unknown) {
    if (error instanceof ConveyorRejectionError) {
      res.status(200).send({ status: CreditStatus.CC_DENIED, error: error.message }); // status ✅ reason denied  during normal process
    } else if (error instanceof ConveyorValidationError) {
      res.status(400).send({ error: error.message }); // status ❌ reason denied  during normal process
    } else if (error instanceof Error) {
      res.status(400).send({ error: error.message }); // status ❌ reason denied  during normal process
    } else res.status(400).send({ error: 'unknown error during calculation' }); // status ❌ reason denied  during normal process
  }
};
export { getCalculationResult };
