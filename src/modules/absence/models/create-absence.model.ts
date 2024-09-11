import { CreateAbsenceCommand } from '../commands/implements/create-absence.command';

export class CreateAbsenceModel {
  readonly employeeId: string
  readonly date: Date
  readonly reason: string

  constructor(absence: CreateAbsenceCommand) {
    this.employeeId = absence.employeeId;
    this.date = absence.date;
    this.reason = absence.reason;
  }
}
