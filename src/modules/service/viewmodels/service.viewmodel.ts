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
  establishmentId: string;
  
  @ApiProperty()
  createdAt: string;

  constructor(service: any) {
    this.id = service.id;
    this.name = service.name;
    this.description = service.description;
    this.durationMinutes = service.durationMinutes;
    this.price = service.price;
    this.establishmentId = service.establishmentId;
    this.createdAt = new Date(service.createdAt).toLocaleDateString();
  }
}