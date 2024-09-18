import { ICommand } from "@nestjs/cqrs";

export class CreateEmployeeCommand implements ICommand {
  constructor(
    readonly userId: string,
  ) { }
}