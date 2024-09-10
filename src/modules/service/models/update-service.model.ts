import { UpdateServiceCommand } from "../commands/implements/update-service.command";

export class UpdateServiceModel {
  readonly id: string
  readonly name: string;
  readonly description: string;
  readonly durationMinutes: number;
  readonly price: number;
  readonly establishmentId: string;

  constructor(establishmentId: string, service: UpdateServiceCommand) {
    this.id = service.id
    this.name = service.name;
    this.description = service.description;
    this.durationMinutes = service.durationMinutes;
    this.price = service.price;
    this.establishmentId = establishmentId;
  }
}