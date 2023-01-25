import { Request, Response } from 'express';
import { getErrorMessage } from '../errors/base.error.js';
import * as userServices from '../services/user.service.js';
import { User } from '../dto/user.dto.js';

export const loginOne = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

export const registerOne = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body as User);
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};
