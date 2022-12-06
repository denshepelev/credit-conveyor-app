import { Request, Response } from "express";
import { CalculationService } from "../services/calculation.service";

const getCalculationResult = async (req: Request, res: Response) => {
  try {
    const calculationResult = new CalculationService(req.body);
    res
      .status(200)
      .send(JSON.stringify(calculationResult.getCredit(), null, 3));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
export { getCalculationResult };
