//import pg from 'pg';
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

//const client = new pg.Client(configCreate);

let pool = new Pool(configCreate);
/*
await client
  .connect()
  .then(() => {
    logger.info('connected to DB: template1 => ✅');

    client.query(queries.createDB(process.env.DB_NAME_NEW as string, process.env.DB_USER || 'root'), (err) => {
      if (err) throw err;
      logger.info(`finished query: create ${process.env.DB_NAME_NEW} => ✅`);
      client
        .end()
        .then(() => logger.info('disconnected DB: template1 => ✅'))
        .catch((err) => console.error('error during disconnection DB: template1 => ❌', err.stack));
    });
  })
  .catch((err) => console.error('connection error => ❌', err.stack));

//5 secs for DB update
logger.info('⌚ await 5 sec for DB update...');
await new Promise((r) => setTimeout(r, 5000));
*/
/*
client = new pg.Client(configNewDB);

await client
  .connect()
  .then(() => logger.info(`connected to DB: ${process.env.DB_NAME_NEW} => ✅`))
  .catch((err) => console.error('connection error  => ❌', err.stack));

logger.info('start query: create table employment_status => ⭕');
client.query(queries.createEmploymentStatus, (err) => {
  if (err) throw err;
  logger.info('finished query: create table employment_status => ✅');
  //client.end();
});

logger.info('start query: insert new record in employment_status => ⭕');
client.query(queries.fillEmploymentStatus, (err) => {
  if (err) throw err;
  logger.info('finished query: insert new record in employment_status => ✅');
  client.end((err) => {
    logger.info(`disconnected DB: ${process.env.DB_NAME_NEW} => ✅`);
    if (err) {
      console.log('error during disconnection  DB: ${process.env.DB_NAME_NEW} => ❌', err.stack);
    }
  });
});
*/
try {
  logger.info(`start query: create DB: ${process.env.DB_NAME_NEW} => ...⌛`);
  await pool.query(queries.createDB(process.env.DB_NAME_NEW as string, process.env.DB_USER || 'root'));
  logger.info(`finished query: create DB: ${process.env.DB_NAME_NEW} => ✅`);

  logger.info('⌚ await 8 sec for DB update and reconnect...⌛');
  await new Promise((r) => setTimeout(r, 8000));

  pool = new Pool(configNewDB);

  logger.info(`start query: create table employment_status =>...⌛`);
  await pool.query(queries.createEmploymentStatus);
  logger.info(`finished query: create table employment_status => ✅`);

  logger.info(`start query: insert new records in employment_status =>...⌛`);
  await pool.query(queries.fillEmploymentStatus);
  logger.info(`finished query: insert new records in employment_status => ✅`);

  logger.info(`start query: create table employment_position =>...⌛`);
  await pool.query(queries.createEmploymentPosition);
  logger.info(`finished query: create table employment_position => ✅`);

  logger.info(`start query: insert new records in employment_position =>...⌛`);
  await pool.query(queries.fillEmploymentPosition);
  logger.info(`finished query: insert new records in employment_position => ✅`);

  logger.info(`start query: create table gender =>...⌛`);
  await pool.query(queries.createGender);
  logger.info(`finished query: create table gender => ✅`);

  logger.info(`start query: insert new records in gender =>...⌛`);
  await pool.query(queries.fillGender);
  logger.info(`finished query: insert new records in gender => ✅`);

  logger.info(`start query: create table marital_status =>...⌛`);
  await pool.query(queries.createMaritalStatus);
  logger.info(`finished query: create table marital_status => ✅`);

  logger.info(`start query: insert new records in marital_status =>...⌛`);
  await pool.query(queries.fillMaritalStatus);
  logger.info(`finished query: insert new records in marital_status => ✅`);

  logger.info(`start query: create table application_status =>...⌛`);
  await pool.query(queries.createApplicationStatus);
  logger.info(`finished query: create table application_status => ✅`);

  logger.info(`start query: insert new records in application_status =>...⌛`);
  await pool.query(queries.fillApplicationStatus);
  logger.info(`finished query: insert new records in application_status => ✅`);

  logger.info(`start query: create table credit_status =>...⌛`);
  await pool.query(queries.createCreditStatus);
  logger.info(`finished query: create table credit_status => ✅`);

  logger.info(`start query: insert new records in credit_status =>...⌛`);
  await pool.query(queries.fillCreditStatus);
  logger.info(`finished query: insert new records in credit_status => ✅`);

  logger.info(`start query: create table passport =>...⌛`);
  await pool.query(queries.createPassport);
  logger.info(`finished query: create table passport => ✅`);

  logger.info(`start query: create table employment =>...⌛`);
  await pool.query(queries.createEmployment);
  logger.info(`finished query: create table employment => ✅`);

  logger.info(`start query: create table client =>...⌛`);
  await pool.query(queries.createClient);
  logger.info(`finished query: create table client => ✅`);

  logger.info(`start query: create table credit =>...⌛`);
  await pool.query(queries.createCredit);
  logger.info(`finished query: create table credit => ✅`);

  logger.info(`start query: create table application =>...⌛`);
  await pool.query(queries.createApplication);
  logger.info(`finished query: create table application => ✅`);
} catch (error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('unexpected error');
  }
}
