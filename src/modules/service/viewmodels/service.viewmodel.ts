import { ApiProperty } from "@nestjs/swagger";

export class ServiceViewModel {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  description: string;
  
  @ApiProperty()
  durationMinutes: number;
  
  @ApiProperty()
  price: number;
  
  @ApiProperty()
  studioId: string;
  
  @ApiProperty()
  createdAt: string;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.description = service.description;
    this.durationMinutes = service.durationMinutes;
    this.price = service.price;
    this.studioId = service.studioId;
    this.createdAt = new Date(service.createdAt).toLocaleDateString();
  }
}