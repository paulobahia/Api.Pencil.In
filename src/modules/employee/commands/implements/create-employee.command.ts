import { ICommand } from "@nestjs/cqrs";

export class CreateEmployeeCommand implements ICommand {
  constructor(
    readonly establishmentId: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) { }
}