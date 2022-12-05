import express from "express";

import * as scoringController from "../controllers/scoring.controller";

const router = express.Router();

/* POST scoring */
router.post("/conveyor/calculation", scoringController.getScoringResult);

export { router as default };
