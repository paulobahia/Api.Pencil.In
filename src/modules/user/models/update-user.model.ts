import { UpdateUserCommand } from '../commands/implements/update-user.command';

export class UpdateUserModel {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly studioId: string;

  constructor(studioId: string, user: UpdateUserCommand) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.studioId = studioId;
  }
}
