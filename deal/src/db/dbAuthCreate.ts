import Pool from 'pg-pool';
import * as dotenv from 'dotenv';
import { logger } from '../logger.js';
import * as queries from './dbQueries.js';

dotenv.config();

const configCreate = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'template1',
};

const configNewDB = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_NEW,
};

let pool = new Pool(configCreate);

try {
  logger.info(`start query: create DB: ${process.env.DB_NAME_NEW} => ...⌛`);
  await pool.query(queries.createDB(process.env.DB_NAME_NEW as string, process.env.DB_USER || 'root'));
  logger.info(`finished query: create DB: ${process.env.DB_NAME_NEW} => ✅`);

  logger.info('⌚ await 8 sec for DB update and reconnect...⌛');
  await new Promise((r) => setTimeout(r, 8000));

  pool = new Pool(configNewDB);

  logger.info(`start query: create table role =>...⌛`);
  await pool.query(queries.createRole);
  logger.info(`finished query: create table role => ✅`);

  logger.info(`start query: insert new records in role =>...⌛`);
  await pool.query(queries.fillRole);
  logger.info(`finished query: insert new records in role => ✅`);

  logger.info(`start query: create table users =>...⌛`);
  await pool.query(queries.createUsers);
  logger.info(`finished query: create table users => ✅`);
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('unexpected error');
  }
}
