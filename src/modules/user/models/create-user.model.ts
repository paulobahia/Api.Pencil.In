import { CreateUserCommand } from '../commands/implements/create-user.command';

export class CreateUserModel {
  readonly name: string;
  readonly phone: string;
  readonly studioId: string;

  constructor(studioId: string, User: CreateUserCommand) {
    this.name = User.name;
    this.phone = User.phone;
    this.studioId = studioId;
  }
}
