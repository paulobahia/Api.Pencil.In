import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implements/create-user.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { CreateUserModel } from '../../models/create-user.model';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  async execute(command: CreateUserCommand): Promise<void> {
    const { studioId } = command;

    const studio =
      await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const createUser = new CreateUserModel(studioId, command);

    await this.userRepository.create(createUser);
  }
}
