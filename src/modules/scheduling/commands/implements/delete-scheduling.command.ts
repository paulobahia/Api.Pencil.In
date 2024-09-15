import { ICommand } from '@nestjs/cqrs';

export class DeleteSchedulingCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
