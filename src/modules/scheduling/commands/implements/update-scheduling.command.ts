import { ICommand } from '@nestjs/cqrs';
import { SchedulingStatus } from '@prisma/client';

export class UpdateSchedulingCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly id: string,
    readonly servicesIds: string[],
    readonly schedulingTime: Date,
    readonly status: SchedulingStatus,
    readonly notes?: string
  ) { }
}
