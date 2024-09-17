import { CreateClientCommand } from '../commands/implements/create-client.command';

export class CreateClientModel {
  readonly name: string;
  readonly phone: string;
  readonly studioId: string;

  constructor(studioId: string, Client: CreateClientCommand) {
    this.name = Client.name;
    this.phone = Client.phone;
    this.studioId = studioId;
  }
}
