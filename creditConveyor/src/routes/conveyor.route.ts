import express from 'express';

import offersRoute from './offers.route.js';
import calculationRoute from './calculation.route.js';

const router = express.Router();

router.use('/calculation', calculationRoute);
router.use('/offers', offersRoute);

export { router as default };
