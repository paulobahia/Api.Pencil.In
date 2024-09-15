import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSchedulingByIdQuery } from '../implements/find-scheduling-by-id.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { SchedulingRepository } from '../../interfaces/scheduling-repository.interface';
import { SchedulingViewModel } from '../../viewmodels/scheduling.viewmodel';

@QueryHandler(FindSchedulingByIdQuery)
export class FindSchedulingByIdHandler
  implements IQueryHandler<FindSchedulingByIdQuery, SchedulingViewModel> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SCHEDULING_REPOSITORY)
  private readonly schedulingRepository: SchedulingRepository;

  async execute({ id, studioId }: FindSchedulingByIdQuery): Promise<SchedulingViewModel> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const scheduling = await this.schedulingRepository.findById(id, studioId);

    return new SchedulingViewModel(scheduling)
  }
}
