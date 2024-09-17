import { UpdateClientCommand } from '../commands/implements/update-client.command';

export class UpdateClientModel {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly studioId: string;

  constructor(studioId: string, client: UpdateClientCommand) {
    this.id = client.id;
    this.name = client.name;
    this.phone = client.phone;
    this.studioId = studioId;
  }
}
