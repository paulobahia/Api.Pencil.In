import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindServiceByIdQuery } from '../implements/find-service-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { ServiceViewModel } from '../../viewmodels/service.viewmodel';
import { ServiceModule } from '../../service.module';

@QueryHandler(FindServiceByIdQuery)
export class FindServiceByIdHandler
  implements IQueryHandler<FindServiceByIdQuery, ServiceModule> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute({ id, establishmentId, }: FindServiceByIdQuery): Promise<ServiceModule> {
    const establishment = await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const service = await this.serviceRepository.findById(id, establishmentId);

    return new ServiceViewModel(service)
  }
}
