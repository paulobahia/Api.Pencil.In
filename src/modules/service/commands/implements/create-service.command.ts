import { ICommand } from '@nestjs/cqrs';

export class CreateServiceCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly name: string,
    readonly description: string,
    readonly durationMinutes: number,
    readonly price: number,
  ) {}
}
