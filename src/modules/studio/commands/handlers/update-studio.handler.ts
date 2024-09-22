import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStudioCommand } from '../implements/update-studio.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { UpdateStudioModel } from '../../models/update-studio.model';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@CommandHandler(UpdateStudioCommand)
export class UpdateStudioHandler implements ICommandHandler<UpdateStudioCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute(command: UpdateStudioCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.id)

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const updateStudio = new UpdateStudioModel(command);

    await this.studioRepository.update(updateStudio);
  }
}
