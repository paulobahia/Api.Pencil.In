import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAbsenceQuery } from "../implements/find-absence.query";
import { AbsenceViewModel } from "../../viewmodels/absence.viewmodel";
import { InjectionToken } from "src/modules/injection-token";
import { Inject, NotFoundException } from "@nestjs/common";
import { EstablishmentRepository } from "src/modules/establishment/interfaces/establishment.interface";
import { AbsenceRepository } from "../../interfaces/absence.interface";

@QueryHandler(FindAbsenceQuery)
export class FindAbsenceHandler
  implements IQueryHandler<FindAbsenceQuery, AbsenceViewModel[]> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute({ establishmentId }: FindAbsenceQuery): Promise<AbsenceViewModel[]> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const absences = await this.absenceRepository.find(establishmentId)

    console.log(absences)

    return absences.map(absence => new AbsenceViewModel(absence))
  }
}