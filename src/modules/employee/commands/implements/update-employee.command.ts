import { ICommand } from '@nestjs/cqrs';

export class UpdateEmployeeCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) { }
}
