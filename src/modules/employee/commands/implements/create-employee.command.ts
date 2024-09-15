import { ICommand } from '@nestjs/cqrs';

export class CreateEmployeeCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
