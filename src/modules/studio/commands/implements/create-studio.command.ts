import { ICommand } from '@nestjs/cqrs';

export class CreateStudioCommand implements ICommand {
  constructor(
    readonly employeeId: string,
    readonly name: string,
    readonly address: string,
    readonly description: string,
    readonly phone: string,
  ) { }
}
