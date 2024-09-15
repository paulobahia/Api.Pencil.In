import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindStudioQuery } from '../implements/find-studio.query';
import { StudioRepository } from '../../interfaces/studio.interface';
import { StudioViewModel } from '../../viewmodels/studio.viewmodel';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@QueryHandler(FindStudioQuery)
export class FindStudioHandler
  implements IQueryHandler<FindStudioQuery, StudioViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute(): Promise<StudioViewModel[]> {

    const studios = await this.studioRepository.find()

    return studios.map(studio => new StudioViewModel(studio));
  }
}
