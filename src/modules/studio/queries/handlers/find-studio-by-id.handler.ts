import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { StudioViewModel } from '../../viewmodels/studio.viewmodel';
import { FindStudioByIdQuery } from '../implements/find-studio-by-id.query';

@QueryHandler(FindStudioByIdQuery)
export class FindStudioByIdHandler implements IQueryHandler<FindStudioByIdQuery, StudioViewModel> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute({ id }: FindStudioByIdQuery): Promise<StudioViewModel> {
    const studio = await this.studioRepository.findById(id);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    return new StudioViewModel(studio)
  }
}
