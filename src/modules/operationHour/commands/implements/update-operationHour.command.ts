import { ICommand } from "@nestjs/cqrs";
import { DayOfWeek } from "@prisma/client";

class UpdateTimeIntervalsCommand {
  readonly id: string;
  readonly startTime: string;
  readonly endTime: string;
}

class UpdateExceptionsCommand {
  readonly id: string;
  readonly exceptionDate: Date;
  readonly timeIntervals: UpdateTimeIntervalsCommand[];
}

export class UpdateOperationHourCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly employeeId: string,
    readonly id: string,
    readonly dayOfWeek: DayOfWeek[],
    readonly isDefault: boolean,
    readonly timeIntervals: UpdateTimeIntervalsCommand[],
    readonly exceptions?: UpdateExceptionsCommand[],
    readonly specificDate?: Date
  ) { }
}