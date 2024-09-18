import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implements/update-user.command';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { UpdateUserModel } from '../../models/update-user.model';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute(command: UpdateUserCommand): Promise<void> {

    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new NotFoundException('Funcionário');
    }

    const updateUser = new UpdateUserModel(command);

    await this.userRepository.update(updateUser);
  }
}
