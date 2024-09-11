import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindServiceQuery } from '../implements/find-service.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { ServiceViewModel } from '../../viewmodels/service.viewmodel';

@QueryHandler(FindServiceQuery)
export class FindServiceHandler
  implements IQueryHandler<FindServiceQuery, ServiceViewModel[]> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute({ establishmentId }: FindServiceQuery): Promise<ServiceViewModel[]> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const services = await this.serviceRepository.find(establishmentId)

    return services.map(service => new ServiceViewModel(service))
  }
}
