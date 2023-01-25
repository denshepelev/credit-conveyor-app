import express from 'express';

import { sendController } from '../controllers/send.controller.js';
import { signController } from '../controllers/sign.controller.js';
import { codeController } from '../controllers/code.controller.js';

const router = express.Router();

/* POST offers */
router.post('/:applicationId/send', sendController);
router.post('/:applicationId/sign', signController);
router.post('/:applicationId/code', codeController);

export { router as default };
