import { ApiProperty } from "@nestjs/swagger";

export class UserViewModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  studioId: string;

  @ApiProperty()
  createdAt: string;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.studioId = user.studioId;
    this.createdAt = new Date(user.createdAt).toLocaleDateString();
  }
}