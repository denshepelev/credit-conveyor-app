import { LiquibaseConfig, Liquibase, POSTGRESQL_DEFAULT_CONFIG, GenerateChangeLogCommandAttributes } from 'liquibase';

const myConfig: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './src/migration/resources/changelog.xml',
  url: 'jdbc:postgresql://localhost:5432/postgres',
  username: 'root',
  password: 'root',
};
const instance = new Liquibase(myConfig);

async function doEet() {
  //await instance.status();
  // await instance.update();
  // await instance.dropAll();
  await instance.generateChangeLog({} as GenerateChangeLogCommandAttributes);
}

doEet();

/*import { LiquibaseConfig, Liquibase, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';

const CONFIG: LiquibaseConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './resources/changelog.xml',
  url: process.env.DB_URL || 'jdbc:postgresql://localhost:5432/postgres',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORLD || 'root',
};

const instance = new Liquibase(CONFIG);

async function doEet() {
  await instance.status();
  // await instance.generateChangeLog(--data-output-directory='');
  // await instance.update();
}

try {
  doEet();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}*/

/*
DB_USER=admin
DB_URL=jdbc:postgresql://localhost:5432/credit-conveyor
DB_HOST=localhost
DB_NAME=credit-conveyor
DB_PASSWORLD=admin
DB_PORT=5432

host: 'localhost',
  user: 'root',
  database: 'postgres',
  password: 'root',
  port: parseInt(process.env.DB_PORT || '5432'),
*/
