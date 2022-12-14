import { Request, Response } from "express";
import { CalculationService } from "../services/calculation.service";

const calculationService = new CalculationService();

const getCalculationResult = async (req: Request, res: Response) => {
  try {
    const calculationResult = calculationService.getCredit(req.body);
    res.status(200).send(JSON.stringify(calculationResult));
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
export { getCalculationResult };
