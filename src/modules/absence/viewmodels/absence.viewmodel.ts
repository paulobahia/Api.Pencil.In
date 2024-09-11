import { ApiProperty } from "@nestjs/swagger";

export class AbsenceViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  createdAt: string;

  constructor(absence: any) {
    this.id = absence.id;
    this.employeeId = absence.employeeId;
    this.date = absence.date;
    this.reason = absence.reason;
    this.createdAt = new Date(absence.createdAt).toLocaleDateString();
  }
}