import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek } from "@prisma/client";
import { TimeIntervalsViewModel } from "./timeIntervals.view.model";
import { ExceptionsViewModel } from "./exceptions.viewmodel";

export class OperationHourViewModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly dayOfWeek: DayOfWeek;

  @ApiProperty()
  readonly specificDate: string;

  @ApiProperty()
  readonly timeIntervals: TimeIntervalsViewModel[];

  @ApiProperty()
  readonly isAbsence: Boolean;

  @ApiProperty()
  readonly isDefault: Boolean;

  @ApiProperty()
  readonly exceptions: ExceptionsViewModel[];

  @ApiProperty()
  createdAt: string;

  constructor(operationHour: any) {
    this.id = operationHour.id;
    this.dayOfWeek = operationHour.dayOfWeek;
    this.specificDate = this.formatDate(operationHour.specificDate);
    this.timeIntervals = operationHour.timeIntervals.map(timeInterval => new TimeIntervalsViewModel(timeInterval))
    this.exceptions = operationHour.exceptions.map(exception => new ExceptionsViewModel(exception))
    this.isAbsence = operationHour.isAbsence;
    this.isDefault = operationHour.isDefault;
    this.createdAt = new Date(operationHour.createdAt).toLocaleDateString();
  }

  private formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}