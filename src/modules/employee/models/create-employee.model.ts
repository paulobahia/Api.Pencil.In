import { CreateEmployeeCommand } from '../commands/implements/create-employee.command';

export class CreateEmployeeModel {
  readonly userId: string

  constructor(employee: CreateEmployeeCommand) {
    this.userId = employee.userId;
  }
}
