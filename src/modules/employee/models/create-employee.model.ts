import { CreateEmployeeCommand } from "../commands/implements/create-employee.command";

export class CreateEmployeeModel {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly establishmentId: string;

  constructor(establishmentId: string, Employee: CreateEmployeeCommand) {
    this.name = Employee.name;
    this.email = Employee.email;
    this.password = Employee.password;
    this.establishmentId = establishmentId;
  }
}