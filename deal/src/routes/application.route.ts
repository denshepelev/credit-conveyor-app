import express from 'express';

import { applicationController } from '../controllers/application.controller.js';

const router = express.Router();

/* POST offers */
router.post('/', applicationController);

export { router as default };
