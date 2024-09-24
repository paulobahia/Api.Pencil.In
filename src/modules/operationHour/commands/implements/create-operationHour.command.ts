import { ICommand } from '@nestjs/cqrs';
import { DayOfWeek } from '@prisma/client';

class CreateTimeIntervalsCommand {
  readonly startTime: string;
  readonly endTime: string;
}

class CreateExceptionsCommand {
  readonly exceptionDate: Date;
  readonly timeIntervals: CreateTimeIntervalsCommand[];
}

export class CreateOperationHourCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly employeeId: string,
    readonly dayOfWeek: DayOfWeek[],
    readonly isDefault: boolean,
    readonly timeIntervals: CreateTimeIntervalsCommand[],
    readonly exceptions?: CreateExceptionsCommand[],
    readonly specificDate?: Date
  ) { }
}
