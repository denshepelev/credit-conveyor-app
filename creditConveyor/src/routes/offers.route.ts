import express from "express";

import * as offersController from "../controllers/offers.controller";

const router = express.Router();

/* POST offers */
router.post("/", offersController.createOffers);

export { router as default };
