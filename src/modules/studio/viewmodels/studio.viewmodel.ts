import { ApiProperty } from "@nestjs/swagger";

export class StudioViewModel {

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly address: string;

  @ApiProperty()
  readonly phone: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  createdAt: string;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.address = service.address;
    this.phone = service.phone;
    this.description = service.description;
    this.createdAt = new Date(service.createdAt).toLocaleDateString();
  }
}