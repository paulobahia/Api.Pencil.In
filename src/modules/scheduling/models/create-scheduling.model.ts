import { SchedulingStatus } from '@prisma/client';
import { CreateSchedulingCommand } from '../commands/implements/create-scheduling.command';

export class CreateSchedulingModel {
  readonly userId: string;
  readonly servicesIds: string[];
  readonly schedulingTime: Date;
  readonly status: SchedulingStatus;
  readonly notes?: string;

  constructor(scheduling: CreateSchedulingCommand) {
    this.userId = scheduling.userId;
    this.status = scheduling.status;
    this.servicesIds = scheduling.servicesIds;
    this.schedulingTime = scheduling.schedulingTime;
    this.notes = scheduling.notes;
  }
}
