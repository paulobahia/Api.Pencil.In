import { UpdateEmployeeCommand } from "../commands/implements/update-employee.command";

export class UpdateEmployeeModel {
  readonly id: string
  readonly studioId: string

  constructor(employee: UpdateEmployeeCommand) {
    this.id = employee.id;
    this.studioId = employee.studioId;
  }
}
