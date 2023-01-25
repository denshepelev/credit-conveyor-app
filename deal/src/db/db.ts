import Pool from 'pg-pool';
import * as dotenv from 'dotenv';

dotenv.config();
export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  //database: process.env.DB_NAME,
  database: process.env.NODE_ENV === 'test' ? 'test_db' : process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});
