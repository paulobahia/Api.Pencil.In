import { ICommand } from '@nestjs/cqrs';

export class UpdateAbsenceCommand implements ICommand {
  constructor(
    readonly establishmentId: string,
    readonly id: string,
    readonly employeeId: string,
    readonly date: Date,
    readonly reason: string,
  ) { }
}
