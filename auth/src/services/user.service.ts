import jsonwebtoken from 'jsonwebtoken';
import { getErrorMessage } from '../errors/base.error.js';
import { SECRET_KEY } from '../middleware/auth.js';
import { User } from '../dto/user.dto.js';
import { Login } from '../dto/login.dto.js';
import { validate } from 'class-validator';
import { logger } from '../logger.js';
import { pool } from '../db/db.js';

export async function register(user: User): Promise<void> {
  try {
    const newUser: User = new User();
    newUser.email = user.email;
    newUser.password = user.password;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.middleName = user.middleName;
    //newUser.role = user.role; //because all new users are clients

    //✅ VALIDATE input parameters
    await validate(newUser, {
      validationError: { target: false, value: false },
      stopAtFirstError: true,
    }).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        logger.error(JSON.stringify(errors[0].constraints));
        throw new Error(JSON.stringify(errors[0].constraints));
      }
    });

    logger.info('validation success');

    //✅ ENCODE in base64
    newUser.password = Buffer.from(newUser.password).toString('base64');

    //✅ INSERT data in DB

    let text: string;
    let values = [];
    const role = 'client';
    if (newUser.middleName) {
      text =
        'INSERT INTO users (login, password, first_name, second_name, middle_name, role_id) VALUES($1, $2, $3, $4, $5, $6)';
      values = [newUser.email, newUser.password, newUser.firstName, newUser.lastName, newUser.middleName, role];
    } else {
      text = 'INSERT INTO users (login, password, first_name, second_name, role_id) VALUES($1, $2, $3, $4, $5)';
      values = [newUser.email, newUser.password, newUser.firstName, newUser.lastName, role];
    }

    await pool
      .query(text, values)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  } catch (error: unknown) {
    logger.error(getErrorMessage(error));
    throw new Error(getErrorMessage(error));
  }
}

export async function login(login: Login) {
  try {
    const newLogin: Login = new Login();
    newLogin.email = login.email;
    newLogin.password = login.password;

    //✅ VALIDATE input parameters
    await validate(newLogin, {
      validationError: { target: false, value: false },
      stopAtFirstError: true,
    }).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        logger.error(JSON.stringify(errors[0].constraints));
        throw new Error(JSON.stringify(errors[0].constraints));
      }
    });

    logger.info('validation success');

    const textSelect = 'SELECT login, password, role_id FROM users WHERE login = $1';
    const valuesSelect = [newLogin.email];
    const userData = await pool
      .query(textSelect, valuesSelect)
      .then((res) => {
        return res.rows[0];
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    if (!userData.login) {
      throw new Error('user was not found');
    }
    if (!userData.password) {
      throw new Error('user password problem');
    }
    if (!userData.role_id) {
      throw new Error('user do not have role');
    }

    const isMatch = userData.password == Buffer.from(newLogin.password, 'utf8').toString('base64');
    /*
    console.log(`#1 original password: ${newLogin.password}`);
    console.log(`#2 original password in base64: ${Buffer.from(newLogin.password, 'base64')}`);
    console.log(`#3 original password in 'utf8'-base64: ${Buffer.from(newLogin.password, 'utf8').toString('base64')}`); //✅ works fine!!!
    console.log(`#4 original password in base64-ascii: ${Buffer.from(newLogin.password, 'base64').toString('ascii')}`);
    console.log(
      `#5 original password in base64-binary: ${Buffer.from(newLogin.password, 'base64').toString('binary')}`,
    );
    console.log(`#6 original password in base64-utf-8: ${Buffer.from(newLogin.password, 'base64').toString('utf-8')}`);
    console.log(`#7 database password: ${userData.password}`);
    console.log(`#8 database password decoded: ${Buffer.from(userData.password, 'base64')}`);
*/
    logger.info(
      `login ${newLogin.email} match password: ${isMatch}, provided pass: ${
        newLogin.password
      }, required pass: ${Buffer.from(newLogin.password, 'base64').toString('binary')}`,
    );

    let token: string;

    if (isMatch) {
      token = jsonwebtoken.sign({ email: newLogin.email, role: userData.role_id }, SECRET_KEY, {
        expiresIn: 60 * 15,
      });
      logger.info(`generated token: ${token}`);
    } else {
      logger.error('Password is not correct');
      throw new Error('Password is not correct');
    }
    return { login: newLogin.email, role: userData.role_id, token: token };
  } catch (err: unknown) {
    logger.error(`final logging error: ${getErrorMessage(err)}`);
    throw new Error(getErrorMessage(err));
  }
}
