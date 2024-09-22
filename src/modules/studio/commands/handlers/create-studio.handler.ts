import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStudioCommand } from '../implements/create-studio.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { CreateStudioModel } from '../../models/create-studio.model';

@CommandHandler(CreateStudioCommand)
export class CreateStudioHandler implements ICommandHandler<CreateStudioCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute(command: CreateStudioCommand): Promise<void> {
    const createStudio = new CreateStudioModel(command);

    await this.studioRepository.create(createStudio);
  }
}
