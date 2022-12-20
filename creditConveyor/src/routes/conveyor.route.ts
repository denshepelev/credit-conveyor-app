import express from "express";

import offersRoute from "./offers.route";
import calculationRoute from "./calculation.route";

const router = express.Router();

router.use("/calculation", calculationRoute);
router.use("/offers", offersRoute);

export { router as default };
