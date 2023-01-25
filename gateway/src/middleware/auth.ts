import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger.js';
import { getErrorMessage } from '../errors/base.error.js';
import axios from 'axios';

export const SECRET_KEY: Secret = 'your-secret-key-here';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`gateway-auth: req.body: ${req.body}`); //redundant option, uncomment only while hard debugging //console.log(req)
    logger.info('starting request http://localhost:3005/token');
    const res = await axios
      .get('http://localhost:3005/token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
        },
        data: req.body,
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log('error.response.data.....................');
          logger.error(error.response.data);
          throw new Error(error.response.data.error);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //console.log('error.request...........................');
          logger.error(error.request);
          throw new Error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log('error.message............................');
          logger.error(error.message);
          throw new Error(error.message);
        }
        //console.log(error.config);
      });

    logger.info(`data: ${res.data}, status: ${res.status}`);
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
