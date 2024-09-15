import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSchedulingCommand } from '../implements/create-scheduling.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { SchedulingRepository } from '../../interfaces/scheduling-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { CreateSchedulingModel } from '../../models/create-scheduling.model';
import { ServiceRepository } from 'src/modules/service/interfaces/service.interface';
import { UserRepository } from 'src/modules/user/interfaces/user-repository.interface';

@CommandHandler(CreateSchedulingCommand)
export class CreateSchedulingHandler implements ICommandHandler<CreateSchedulingCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SCHEDULING_REPOSITORY)
  private readonly schedulingRepository: SchedulingRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;
  @Inject(InjectionToken.USER_REPOSITORY)
  private readonly userRepository: UserRepository

  async execute(command: CreateSchedulingCommand): Promise<void> {
    const { studioId, userId, servicesIds } = command;

    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const services = await this.serviceRepository.findByIds(servicesIds, studioId)

    if (services.length !== servicesIds.length) {
      throw new NotFoundException('Um ou mais serviços');
    }

    const user = await this.userRepository.findById(userId, studioId)

    if (!user) {
      throw new NotFoundException("Usuário")
    }

    const createScheduling = new CreateSchedulingModel(command);

    await this.schedulingRepository.create(createScheduling);
  }
}
