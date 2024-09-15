import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAbsenceCommand } from '../implements/delete-absence.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { AbsenceRepository } from '../../interfaces/absence.interface';

@CommandHandler(DeleteAbsenceCommand)
export class DeleteAbsenceHandler
  implements ICommandHandler<DeleteAbsenceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute(command: DeleteAbsenceCommand): Promise<void> {
    const { id, studioId } = command;
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const absence = await this.absenceRepository.findById(id, studioId);

    if (!absence) {
      throw new NotFoundException();
    }

    await this.absenceRepository.delete(id, studioId);
  }
}
