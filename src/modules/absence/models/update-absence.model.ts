import { UpdateAbsenceCommand } from "../commands/implements/update-absence.command";

export class UpdateAbsenceModel {
  readonly id: string
  readonly date: Date
  readonly reason: string

  constructor(absence: UpdateAbsenceCommand) {
    this.id = absence.id;
    this.date = absence.date;
    this.reason = absence.reason;
  }
}
