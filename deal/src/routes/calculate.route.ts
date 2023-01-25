import express from 'express';

import { calculateController } from '../controllers/calculate.controller.js';

const router = express.Router();

/* POST offers */
router.put('/:applicationId', calculateController);

export { router as default };
