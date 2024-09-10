import { UpdateEmployeeCommand } from "../commands/implements/update-employee.command";

export class UpdateEmployeeModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly establishmentId: string;

  constructor(establishmentId: string, employee: UpdateEmployeeCommand) {
    this.id = employee.id
    this.name = employee.name;
    this.email = employee.email;
    this.establishmentId = establishmentId;
  }
}