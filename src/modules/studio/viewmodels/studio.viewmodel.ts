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

  constructor(studio: any) {
    this.id = studio.id;
    this.name = studio.name;
    this.address = studio.address;
    this.phone = studio.phone;
    this.description = studio.description;
    this.createdAt = new Date(studio.createdAt).toLocaleDateString();
  }
}