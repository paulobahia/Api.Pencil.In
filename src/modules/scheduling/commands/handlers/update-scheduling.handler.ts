import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSchedulingCommand } from '../implements/update-scheduling.command';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { SchedulingRepository } from '../../interfaces/scheduling-repository.interface';
import { UpdateSchedulingModel } from '../../models/update-scheduling.model';
import { ServiceRepository } from 'src/modules/service/interfaces/service.interface';
import { UserRepository } from 'src/modules/user/interfaces/user-repository.interface';

@CommandHandler(UpdateSchedulingCommand)
export class UpdateSchedulingHandler implements ICommandHandler<UpdateSchedulingCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SCHEDULING_REPOSITORY)
  private readonly schedulingRepository: SchedulingRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository

  async execute(command: UpdateSchedulingCommand): Promise<void> {
    const { studioId, servicesIds } = command;

    const studio = await this.studioRepository.findById(command.studioId,);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const services = await this.serviceRepository.findByIds(servicesIds, studioId)

    if (services.length !== servicesIds.length) {
      throw new NotFoundException('Um ou mais serviços');
    }

    const scheduling = await this.schedulingRepository.findById(command.id, studioId);

    if (!scheduling) {
      throw new NotFoundException("Agendamento");
    }

    const updateScheduling = new UpdateSchedulingModel(command);

    await this.schedulingRepository.update(updateScheduling);
  }
}
