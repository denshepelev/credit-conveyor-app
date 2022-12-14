import express from "express";

import * as offerController from "../controllers/offer.controller";

const router = express.Router();

/* POST offers */
router.post("/", offerController.createOffers);

export { router as default };
