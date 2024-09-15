import { UpdateEmployeeCommand } from '../commands/implements/update-employee.command';

export class UpdateEmployeeModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly studioId: string;

  constructor(studioId: string, employee: UpdateEmployeeCommand) {
    this.id = employee.id;
    this.name = employee.name;
    this.email = employee.email;
    this.studioId = studioId;
  }
}
