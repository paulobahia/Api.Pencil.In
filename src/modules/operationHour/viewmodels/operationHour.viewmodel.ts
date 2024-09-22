import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek } from "@prisma/client";
import { TimeIntervalsViewModel } from "./timeIntervals.view.model";

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

  // @ApiProperty()
  // readonly exceptions: Exceptions[];

  @ApiProperty()
  createdAt: string;

  constructor(operationhour: any) {
    this.id = operationhour.id;
    this.dayOfWeek = operationhour.dayOfWeek;
    this.specificDate = new Date(operationhour.specificDate).toLocaleDateString();
    this.timeIntervals = operationhour.timeIntervals && operationhour.timeIntervals.map(timeInterval => new TimeIntervalsViewModel(timeInterval))
    this.isAbsence = operationhour.isAbsence;
    this.isDefault = operationhour.isDefault;
    this.createdAt = new Date(operationhour.createdAt).toLocaleDateString();
  }
}