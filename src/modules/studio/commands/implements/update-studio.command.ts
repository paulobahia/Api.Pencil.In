import { ICommand } from '@nestjs/cqrs';

export class UpdateStudioCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string,
    readonly description: string,
    readonly phone: string,
  ) { }
}
