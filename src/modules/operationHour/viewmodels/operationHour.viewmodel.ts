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

  constructor(operationhour: any) {
    this.id = operationhour.id;
    this.dayOfWeek = operationhour.dayOfWeek;
    this.specificDate = this.formatDate(operationhour.specificDate);
    this.timeIntervals = operationhour.timeIntervals.map(timeInterval => new TimeIntervalsViewModel(timeInterval))
    this.exceptions = operationhour.exceptions.map(exception => new ExceptionsViewModel(exception))
    this.isAbsence = operationhour.isAbsence;
    this.isDefault = operationhour.isDefault;
    this.createdAt = new Date(operationhour.createdAt).toLocaleDateString();
  }

  private formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}