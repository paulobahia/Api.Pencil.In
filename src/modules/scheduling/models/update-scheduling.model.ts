import { SchedulingStatus } from '@prisma/client';
import { UpdateSchedulingCommand } from '../commands/implements/update-scheduling.command';

export class UpdateSchedulingModel {
  readonly id: string;
  readonly servicesIds: string[];
  readonly schedulingTime: Date;
  readonly status: SchedulingStatus;
  readonly notes?: string;

  constructor(scheduling: UpdateSchedulingCommand) {
    this.id = scheduling.id;
    this.status = scheduling.status;
    this.servicesIds = scheduling.servicesIds;
    this.schedulingTime = scheduling.schedulingTime;
    this.notes = scheduling.notes;
  }
}
