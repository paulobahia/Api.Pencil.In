import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly name: string,
    readonly phone: string,
  ) {}
}
