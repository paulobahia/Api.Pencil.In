import { UpdateUserCommand } from '../commands/implements/update-user.command';

export class UpdateUserModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  constructor(user: UpdateUserCommand) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
