import { ICommand } from "@nestjs/cqrs";

export class CreateAbsenceCommand implements ICommand {
  constructor(
    readonly establishmentId: string,
    readonly employeeId: string,
    readonly date: Date,
    readonly reason: string
  ) { }
}