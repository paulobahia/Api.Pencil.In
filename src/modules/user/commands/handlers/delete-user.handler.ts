import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../implements/delete-user.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { UserRepository } from '../../interfaces/user-repository.interface';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute(command: DeleteUserCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { id, studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const user = await this.userRepository.findById(command.id, studioId);

    if (!user) {
      throw new NotFoundException("Usuário");
    }

    await this.userRepository.delete(id, studioId);
  }
}
