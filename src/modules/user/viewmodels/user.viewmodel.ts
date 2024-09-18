import { ApiProperty } from "@nestjs/swagger";

export class UserViewModel {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  createdAt: string;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = new Date(user.createdAt).toLocaleDateString();
  }
}