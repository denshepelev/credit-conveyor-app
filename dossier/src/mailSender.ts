import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

export async function mailSender(
  email: string,
  firstName: string,
  secondName: string,
  subject: string,
  html: string,
): Promise<void> {
  logger.info(process.env.MAIL_HOSTNAME);

  const transportConfiguration = {
    host: process.env.MAIL_HOSTNAME,
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    logger: true,
  };

  const transporter = nodemailer.createTransport(transportConfiguration);

  const messageConfiguration = {
    from: '"Mesa Verde Bank and Trust" <noreplybank@bk.ru>', // sender address
    to: `"Dear Mr. ${firstName} ${secondName}" <${email}>`, // list of receivers
    subject: `${subject}`, // Subject line
    text: 'plain text body', // plain text body
    html: html, // html body
  };

  const info = await transporter.sendMail(messageConfiguration);

  logger.info(`Message sent: %s', ${info.messageId}`);
  //logger.info('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  logger.info(`Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`);
  // Preview only available when sending through an Ethereal account
  //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//mailSender().catch(console.error);
