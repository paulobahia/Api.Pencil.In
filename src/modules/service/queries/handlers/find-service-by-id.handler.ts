import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindServiceByIdQuery } from '../implements/find-service-by-id.query';
import { FindServiceByIdResult } from '../implements/find-service-by-id.result';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { ServiceRepository } from '../../interfaces/service.interface';

@QueryHandler(FindServiceByIdQuery)
export class FindServiceByIdHandler
  implements IQueryHandler<FindServiceByIdQuery, FindServiceByIdResult>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute({
    id,
    establishmentId,
  }: FindServiceByIdQuery): Promise<FindServiceByIdResult> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    return await this.serviceRepository.findById(id, establishmentId);
  }
}
