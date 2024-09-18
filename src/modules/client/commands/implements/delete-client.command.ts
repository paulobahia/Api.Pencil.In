import { ICommand } from '@nestjs/cqrs';

export class DeleteClientCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
