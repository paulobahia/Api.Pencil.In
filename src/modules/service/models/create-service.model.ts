import { CreateServiceCommand } from '../commands/implements/create-service.command';

export class CreateServiceModel {
  readonly name: string;
  readonly description: string;
  readonly durationMinutes: number;
  readonly price: number;
  readonly establishmentId: string;

  constructor(establishmentId: string, service: CreateServiceCommand) {
    this.name = service.name;
    this.description = service.description;
    this.durationMinutes = service.durationMinutes;
    this.price = service.price;
    this.establishmentId = establishmentId;
  }
}
