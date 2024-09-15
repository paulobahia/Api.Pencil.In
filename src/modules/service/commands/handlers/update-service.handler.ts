import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateServiceCommand } from '../implements/update-service.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { UpdateServiceModel } from '../../models/update-service.model';

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceHandler implements ICommandHandler<UpdateServiceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute(command: UpdateServiceCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { studioId } = command;

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

    const updateService = new UpdateServiceModel(studioId, command);

    await this.serviceRepository.update(updateService);
  }
}
