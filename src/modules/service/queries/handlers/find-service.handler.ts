import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindServiceQuery } from '../implements/find-service.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { ServiceViewModel } from '../../viewmodels/service.viewmodel';

@QueryHandler(FindServiceQuery)
export class FindServiceHandler implements IQueryHandler<FindServiceQuery, ServiceViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute({ studioId }: FindServiceQuery): Promise<ServiceViewModel[]> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const services = await this.serviceRepository.find(studioId)

    return services.map(service => new ServiceViewModel(service))
  }
}
