import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAbsenceCommand } from '../implements/delete-absence.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { AbsenceRepository } from '../../interfaces/absence.interface';

@CommandHandler(DeleteAbsenceCommand)
export class DeleteAbsenceHandler
  implements ICommandHandler<DeleteAbsenceCommand, void> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute(command: DeleteAbsenceCommand): Promise<void> {
    const { id, establishmentId } = command;
    const establishment = await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const absence = await this.absenceRepository.findById(id, establishmentId);

    if (!absence) {
      throw new NotFoundException();
    }

    await this.absenceRepository.delete(id);
  }
}
