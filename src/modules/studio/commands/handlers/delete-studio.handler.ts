import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteStudioCommand } from '../implements/delete-studio.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@CommandHandler(DeleteStudioCommand)
export class DeleteStudioHandler implements ICommandHandler<DeleteStudioCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute({ id }: DeleteStudioCommand): Promise<void> {
    const studio = await this.studioRepository.findById(id)

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    await this.studioRepository.delete(id);
  }
}
