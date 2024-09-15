import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindServiceByIdQuery } from '../implements/find-service-by-id.query';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { ServiceViewModel } from '../../viewmodels/service.viewmodel';
import { ServiceModule } from '../../service.module';

@QueryHandler(FindServiceByIdQuery)
export class FindServiceByIdHandler implements IQueryHandler<FindServiceByIdQuery, ServiceModule> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute({ id, studioId, }: FindServiceByIdQuery): Promise<ServiceModule> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const service = await this.serviceRepository.findById(id, studioId);

    return new ServiceViewModel(service)
  }
}
