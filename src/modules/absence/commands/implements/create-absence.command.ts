import { ICommand } from "@nestjs/cqrs";

export class CreateAbsenceCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly employeeId: string,
    readonly date: Date,
    readonly reason: string
  ) { }
}