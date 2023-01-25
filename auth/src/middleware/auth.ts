import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger.js';
import { getErrorMessage } from '../errors/base.error.js';
import { pool } from '../db/db.js';

export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //console.log(req); //redundant option, uncomment only while hard debugging

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      logger.error('token is empty');
      throw new Error('token is empty');
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    (req as CustomRequest).token = decoded;

    logger.info((decoded as JwtPayload).email);

    const textSelect = 'SELECT login, password, role_id FROM users WHERE login = $1';
    const valuesSelect = [(decoded as JwtPayload).email];
    const userData = await pool
      .query(textSelect, valuesSelect)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    if (!userData.login) {
      logger.error('user was not found');
      throw new Error('user was not found');
    }
    if (!userData.password) {
      logger.error('user password problem');
      throw new Error('user password problem');
    }
    if (!userData.role_id) {
      logger.error('user do not have role');
      throw new Error('user do not have role');
    }

    logger.info('token is valid');

    next();
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      logger.error(`error name: ${err.name}, error message: ${err.message}`);
      res.status(401).send({ error: err.message });
    } else if (err instanceof jwt.TokenExpiredError) {
      logger.error(`error name: ${err.name}, error message: ${err.message}`);
      res.status(401).send({ error: err.message });
    } else {
      res.status(401).send({ error: getErrorMessage(err) });
    }
  }
};
