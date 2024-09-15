import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteServiceCommand } from '../implements/delete-service.command';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { ServiceRepository } from '../../interfaces/service.interface';

@CommandHandler(DeleteServiceCommand)
export class DeleteServiceHandler implements ICommandHandler<DeleteServiceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute(command: DeleteServiceCommand): Promise<void> {
    const { id, studioId } = command;
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const service = await this.serviceRepository.findById(
      command.id,
      studioId,
    );

    if (!service) {
      throw new NotFoundException("Procedimento");
    }

    await this.serviceRepository.delete(id, studioId);
  }
}
