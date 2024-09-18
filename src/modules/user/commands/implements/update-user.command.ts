import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) { }
}
