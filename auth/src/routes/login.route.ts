import express from 'express';

import * as userController from '../controllers/user.controller.js';

const router = express.Router();

/* POST scoring */
router.post('/', userController.loginOne);

export { router as default };
