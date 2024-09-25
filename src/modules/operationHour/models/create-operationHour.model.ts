import { DayOfWeek } from '@prisma/client';
import { CreateOperationHourCommand } from '../commands/implements/create-operationHour.command';

class CreateTimeIntervalsModel {
  readonly startTime: string;
  readonly endTime: string;
}

class CreateExceptionsModel {
  readonly exceptionDate: Date;
  readonly timeIntervals: CreateTimeIntervalsModel[];
}

export class CreateOperationHourModel {
  readonly studioId: string;
  readonly employeeId: string;
  readonly dayOfWeek: DayOfWeek[];
  readonly isDefault: boolean;
  readonly timeIntervals: CreateTimeIntervalsModel[];
  readonly exceptions?: CreateExceptionsModel[];

  constructor(studioId: string, employeeId: string, operationHour: CreateOperationHourCommand) {
    this.studioId = studioId;
    this.employeeId = employeeId;
    this.dayOfWeek = operationHour.dayOfWeek;
    this.isDefault = operationHour.isDefault;
    this.timeIntervals = operationHour.timeIntervals;
    this.exceptions = operationHour.exceptions;
  }
}
