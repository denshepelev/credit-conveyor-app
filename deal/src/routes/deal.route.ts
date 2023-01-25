import express from 'express';
import applicationRoute from './application.route.js';
import calculateRoute from './calculate.route.js';
import offerRoute from './offer.route.js';
import documentRoute from './document.route.js';

const router = express.Router();

router.use('/application', applicationRoute);
router.use('/offer', offerRoute);
router.use('/calculate', calculateRoute);
router.use('/document', documentRoute);

export { router as default };
