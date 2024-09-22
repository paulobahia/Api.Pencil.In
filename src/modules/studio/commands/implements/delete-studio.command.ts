import { ICommand } from '@nestjs/cqrs';

export class DeleteStudioCommand implements ICommand {
  constructor(
    readonly id: string,
  ) { }
}
