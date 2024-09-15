import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSchedulingCommand } from '../implements/delete-scheduling.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { SchedulingRepository } from '../../interfaces/scheduling-repository.interface';

@CommandHandler(DeleteSchedulingCommand)
export class DeleteSchedulingHandler implements ICommandHandler<DeleteSchedulingCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SCHEDULING_REPOSITORY)
  private readonly schedulingRepository: SchedulingRepository;

  async execute(command: DeleteSchedulingCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { id, studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const scheduling = await this.schedulingRepository.findById(command.id, studioId);

    if (!scheduling) {
      throw new NotFoundException("Agendamento");
    }

    await this.schedulingRepository.delete(id, studioId);
  }
}
