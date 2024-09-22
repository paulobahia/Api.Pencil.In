import { UpdateStudioCommand } from '../commands/implements/update-studio.command';

export class UpdateStudioModel {
  readonly id: string
  readonly name: string
  readonly address: string
  readonly description: string
  readonly phone: string

  constructor(studio: UpdateStudioCommand) {
    this.id = studio.id
    this.name = studio.name;
    this.address = studio.address;
    this.description = studio.description;
    this.phone = studio.phone;
  }
}
