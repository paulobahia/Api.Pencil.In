import { ICommand } from '@nestjs/cqrs';

export class DeleteServiceCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly establishmentId: string,
  ) {}
}
