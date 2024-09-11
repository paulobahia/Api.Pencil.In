import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAbsenceByIdQuery } from '../implements/find-absence-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { AbsenceRepository } from '../../interfaces/absence.interface';
import { AbsenceViewModel } from '../../viewmodels/absence.viewmodel';
import { AbsenceModule } from '../../absence.module';

@QueryHandler(FindAbsenceByIdQuery)
export class FindAbsenceByIdHandler
  implements IQueryHandler<FindAbsenceByIdQuery, AbsenceModule> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute({ id, establishmentId, }: FindAbsenceByIdQuery): Promise<AbsenceModule> {
    const establishment = await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const absence = await this.absenceRepository.findById(id, establishmentId);

    return new AbsenceViewModel(absence)
  }
}
