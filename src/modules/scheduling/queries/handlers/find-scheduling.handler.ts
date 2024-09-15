import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSchedulingQuery } from '../implements/find-scheduling.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { SchedulingRepository } from '../../interfaces/scheduling-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { SchedulingViewModel } from '../../viewmodels/scheduling.viewmodel';

@QueryHandler(FindSchedulingQuery)
export class FindSchedulingHandler
  implements IQueryHandler<FindSchedulingQuery, SchedulingViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SCHEDULING_REPOSITORY)
  private readonly schedulingRepository: SchedulingRepository;

  async execute({ studioId }: FindSchedulingQuery): Promise<SchedulingViewModel[]> {
    const studio =
      await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const schedulings = await this.schedulingRepository.find(studioId);

    return schedulings.map(scheduling => new SchedulingViewModel(scheduling))
  }
}
