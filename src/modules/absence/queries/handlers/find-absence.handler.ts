import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAbsenceQuery } from "../implements/find-absence.query";
import { AbsenceViewModel } from "../../viewmodels/absence.viewmodel";
import { InjectionToken } from "src/modules/injection-token";
import { Inject, NotFoundException } from "@nestjs/common";
import { StudioRepository } from "src/modules/studio/interfaces/studio.interface";
import { AbsenceRepository } from "../../interfaces/absence.interface";

@QueryHandler(FindAbsenceQuery)
export class FindAbsenceHandler
  implements IQueryHandler<FindAbsenceQuery, AbsenceViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute({ studioId }: FindAbsenceQuery): Promise<AbsenceViewModel[]> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const absences = await this.absenceRepository.find(studioId)

    console.log(absences)

    return absences.map(absence => new AbsenceViewModel(absence))
  }
}