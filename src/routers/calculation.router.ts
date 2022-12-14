import express from "express";

import * as calculationController from "../controllers/calculation.controller";

const router = express.Router();

/* POST scoring */
router.post("/", calculationController.getCalculationResult);

export { router as default };
