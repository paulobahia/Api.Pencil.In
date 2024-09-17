import { ICommand } from '@nestjs/cqrs';
import { SchedulingStatus } from '@prisma/client';

export class CreateSchedulingCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly clientId: string,
    readonly servicesIds: string[],
    readonly schedulingTime: Date,
    readonly status: SchedulingStatus,
    readonly notes?: string
  ) { }
}
