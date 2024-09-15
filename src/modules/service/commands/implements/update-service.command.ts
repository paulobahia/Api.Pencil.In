import { ICommand } from '@nestjs/cqrs';

export class UpdateServiceCommand implements ICommand {
  constructor(
    readonly studioId: string,
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly durationMinutes: number,
    readonly price: number,
  ) {}
}
