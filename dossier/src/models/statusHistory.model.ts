import { ApplicationStatus } from '../types/applicationStatus.enum.js';
import { ChangeType } from '../types/changeType.enum.js';

export class StatusHistory {
  status: ApplicationStatus;
  time: Date;
  changeType: ChangeType;

  constructor(status: ApplicationStatus, time: Date, changeType: ChangeType) {
    this.status = status;
    this.time = time;
    this.changeType = changeType;
  }
}
