import express from 'express';

import * as userController from '../controllers/user.controller.js';

const router = express.Router();

/* POST scoring */
router.post('/', userController.registerOne);

export { router as default };
