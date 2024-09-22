import { CreateStudioCommand } from '../commands/implements/create-studio.command';

export class CreateStudioModel {
  readonly employeeId: string
  readonly name: string
  readonly address: string
  readonly description: string
  readonly phone: string

  constructor(studio: CreateStudioCommand) {
    this.employeeId = studio.employeeId
    this.name = studio.name;
    this.address = studio.address;
    this.description = studio.description;
    this.phone = studio.phone;
  }
}
