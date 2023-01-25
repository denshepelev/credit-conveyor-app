//import { Topics } from '../types/kafkaTopics.enum.js';

import { CreditDTO } from './credit.dto.js';

/*
export class EmailMessage {
  address: string;
  theme: Topics;
  applicationID: number;

  constructor(address: string, theme: Topics, applicationID: number) {
    this.address = address;
    this.theme = theme;
    this.applicationID = applicationID;
  }
}*/
export interface EmailMessage {
  email: string;
  firstName: string;
  lastName: string;
  credit?: CreditDTO;
  ses?: string;
}
