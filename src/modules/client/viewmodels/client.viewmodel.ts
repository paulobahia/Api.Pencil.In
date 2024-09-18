import { ApiProperty } from "@nestjs/swagger";

export class ClientViewModel {
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

  constructor(client: any) {
    this.id = client.id;
    this.name = client.name;
    this.phone = client.phone;
    this.studioId = client.studioId;
    this.createdAt = new Date(client.createdAt).toLocaleDateString();
  }
}