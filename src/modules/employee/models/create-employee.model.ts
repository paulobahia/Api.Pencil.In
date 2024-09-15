import { CreateEmployeeCommand } from '../commands/implements/create-employee.command';

export class CreateEmployeeModel {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly studioId: string;

  constructor(studioId: string, Employee: CreateEmployeeCommand) {
    this.name = Employee.name;
    this.email = Employee.email;
    this.password = Employee.password;
    this.studioId = studioId;
  }
}
