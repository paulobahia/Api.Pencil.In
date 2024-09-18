import { CreateUserCommand } from '../commands/implements/create-user.command';

export class CreateUserModel {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone: string;

  constructor(User: CreateUserCommand) {
    this.name = User.name;
    this.email = User.email;
    this.password = User.password;
    this.phone = User.phone;
  }
}
