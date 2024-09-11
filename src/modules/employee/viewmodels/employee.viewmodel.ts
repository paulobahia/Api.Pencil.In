import { ApiProperty } from "@nestjs/swagger";

export class EmployeeViewModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  createdAt: string;

  constructor(employee: any) {
    this.id = employee.id;
    this.name = employee.name;
    this.email = employee.email;
    this.createdAt = new Date(employee.createdAt).toLocaleDateString();
  }
}