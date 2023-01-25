import express from 'express';
import { applicationController } from '../controllers/application.controller.js';
import offerRoute from './offer.route.js';

const router = express.Router();

router.use('/offer', offerRoute);
router.post('/', applicationController);

export { router as default };
