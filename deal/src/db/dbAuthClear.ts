import Pool from 'pg-pool';
import * as dotenv from 'dotenv';
import { logger } from '../logger.js';
import * as queries from './dbQueries.js';

dotenv.config();

const configNewDB = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_NEW,
};

const pool = new Pool(configNewDB);

try {
  logger.info(`start query: clear DB: ${process.env.DB_NAME_NEW} => ...⌛`);
  await pool.query(queries.clearAuthDB);
  logger.info(`finished query: clear DB: ${process.env.DB_NAME_NEW} => ✅`);
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('unexpected error');
  }
}
