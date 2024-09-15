import { ICommand } from '@nestjs/cqrs';

export class DeleteAbsenceCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly studioId: string,
  ) {}
}
