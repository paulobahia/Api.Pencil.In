import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAbsenceByIdQuery } from '../implements/find-absence-by-id.query';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { AbsenceRepository } from '../../interfaces/absence.interface';
import { AbsenceViewModel } from '../../viewmodels/absence.viewmodel';
import { AbsenceModule } from '../../absence.module';

@QueryHandler(FindAbsenceByIdQuery)
export class FindAbsenceByIdHandler
  implements IQueryHandler<FindAbsenceByIdQuery, AbsenceModule> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute({ id, studioId, }: FindAbsenceByIdQuery): Promise<AbsenceModule> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const absence = await this.absenceRepository.findById(id, studioId);

    return new AbsenceViewModel(absence)
  }
}
