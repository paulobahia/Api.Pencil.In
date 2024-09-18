import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../implements/delete-user.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { UserRepository } from '../../interfaces/user-repository.interface';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, void> {
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id } = command;

    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new NotFoundException('Funcionário');
    }

    await this.userRepository.delete(id);
  }
}
