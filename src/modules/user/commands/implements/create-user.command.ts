import { ICommand } from '@nestjs/cqrs';

export class CreateClientCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly name: string,
    readonly phone: string,
  ) {}
}
