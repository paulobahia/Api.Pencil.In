import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ServiceRepository } from '../../interfaces/service.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { CreateServiceCommand } from '../implements/create-service.command';
import { CreateServiceModel } from '../../models/create-service.model';

@CommandHandler(CreateServiceCommand)
export class CreateServiceHandler implements ICommandHandler<CreateServiceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute(command: CreateServiceCommand): Promise<void> {
    const { studioId } = command;
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const createService = new CreateServiceModel(studioId, command);

    await this.serviceRepository.create(createService);
  }
}
