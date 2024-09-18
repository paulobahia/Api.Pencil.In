import { ICommand } from '@nestjs/cqrs';

export class UpdateClientCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly id: string,
    readonly name: string,
    readonly phone: string,
  ) { }
}
