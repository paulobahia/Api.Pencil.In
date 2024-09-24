import { ApiProperty } from "@nestjs/swagger";

export class TimeIntervalsViewModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly timeIntervalsId: string;

  @ApiProperty()
  readonly timeIntervalsExceptionId: string;

  @ApiProperty()
  readonly startTime: string;

  @ApiProperty()
  readonly endTime: string;

  constructor(timeIntervals: any) {
    this.id = timeIntervals.id;
    this.timeIntervalsId = timeIntervals.timeIntervalsId;
    this.timeIntervalsExceptionId = timeIntervals.timeIntervalsExceptionId;
    this.startTime = this.formatTime(timeIntervals.startTime);
    this.endTime = this.formatTime(timeIntervals.endTime);
  }

  private formatTime(time: Date | string): string {
    const date = new Date(time);
    return date.toUTCString().split(" ")[4];
  }
}