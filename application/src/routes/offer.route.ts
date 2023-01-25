import express from 'express';

import { offerController } from '../controllers/offer.controller.js';

const router = express.Router();

/* POST offers */
router.put('/', offerController);

export { router as default };
