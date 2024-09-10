import { ICommand } from '@nestjs/cqrs';

export class CreateServiceCommand implements ICommand {
  constructor(
    readonly establishmentId: string,
    readonly name: string,
    readonly description: string,
    readonly durationMinutes: number,
    readonly price: number,
  ) {}
}
