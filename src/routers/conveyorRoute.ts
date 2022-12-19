import express from "express";

import offerRouter from "./offer.router";
import calculationRouter from "./calculation.router";

const router = express.Router();

router.use("/calculation", calculationRouter);
router.use("/offers", offerRouter);

export { router as default };
