import { DayOfWeek } from '@prisma/client';
import { UpdateOperationHourCommand } from '../commands/implements/update-operationHour.command';

class UpdateTimeIntervalsModel {
  readonly id: string;
  readonly startTime: string;
  readonly endTime: string;
}

class UpdateExceptionsModel {
  readonly id: string;
  readonly exceptionDate: Date;
  readonly timeIntervals: UpdateTimeIntervalsModel[];
}

export class UpdateOperationHourModel {
  readonly id: string;
  readonly studioId: string;
  readonly employeeId: string;
  readonly dayOfWeek: DayOfWeek[];
  readonly isDefault: boolean;
  readonly timeIntervals: UpdateTimeIntervalsModel[];
  readonly exceptions?: UpdateExceptionsModel[];

  constructor(studioId: string, employeeId: string, operationHour: UpdateOperationHourCommand) {
    this.id = operationHour.id;
    this.studioId = studioId;
    this.employeeId = employeeId;
    this.dayOfWeek = operationHour.dayOfWeek;
    this.isDefault = operationHour.isDefault;
    this.timeIntervals = operationHour.timeIntervals;
    this.exceptions = operationHour.exceptions;
  }
}
