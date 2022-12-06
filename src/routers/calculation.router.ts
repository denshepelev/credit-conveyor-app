import express from "express";

import * as calculationController from "../controllers/calculation.controller";

const router = express.Router();

/* POST scoring */
router.post(
  "/conveyor/calculation",
  calculationController.getCalculationResult
);

export { router as default };
