import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OperationHourRepository } from '../../interfaces/operationHour.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { CreateOperationHourCommand } from '../implements/create-operationHour.command';
import { CreateOperationHourModel } from '../../models/create-operationHour.model';

@CommandHandler(CreateOperationHourCommand)
export class CreateOperationHourHandler implements ICommandHandler<CreateOperationHourCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.OPERATIONHOUR_REPOSITORY)
  private readonly operationhourRepository: OperationHourRepository;

  async execute(command: CreateOperationHourCommand): Promise<void> {
    const { studioId, employeeId } = command;
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const createOperationHour = new CreateOperationHourModel(studioId, employeeId, command);

    await this.operationhourRepository.create(createOperationHour);
  }
}
