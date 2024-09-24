import { ApiProperty } from "@nestjs/swagger";
import { TimeIntervalsViewModel } from "./timeIntervals.view.model";

export class ExceptionsViewModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly exceptionDate: string;

  @ApiProperty()
  readonly timeIntervals: TimeIntervalsViewModel[];

  constructor(exceptions: any) {
    this.id = exceptions.id;
    this.exceptionDate = this.formatDate(exceptions.exceptionDate);
    this.timeIntervals = exceptions.timeIntervals.map(timeInterval => new TimeIntervalsViewModel(timeInterval))
  }

  private formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}