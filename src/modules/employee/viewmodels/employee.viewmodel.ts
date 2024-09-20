import { ApiProperty } from "@nestjs/swagger";

export class EmployeeViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  studioId: string;

  @ApiProperty()
  createdAt: string;

  constructor(employee: any) {
    this.id = employee.id;
    this.userId = employee.userId;
    this.studioId = employee.studioId;
    this.createdAt = new Date(employee.createdAt).toLocaleDateString();
  }
}