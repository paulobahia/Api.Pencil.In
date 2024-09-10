import { ICommand } from '@nestjs/cqrs';

export class UpdateEmployeeCommand implements ICommand {
  constructor(
    readonly establishmentId: string,
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) {}
}
