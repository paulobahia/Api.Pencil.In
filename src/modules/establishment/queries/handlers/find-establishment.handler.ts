import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEstablishmentQuery } from '../implements/find-establishment.query';
import { EstablishmentRepository } from '../../interfaces/establishment.interface';
import { EstablishmentViewModel } from '../../viewmodels/establishment.viewmodel';

@QueryHandler(FindEstablishmentQuery)
export class FindEstablishmentHandler
  implements IQueryHandler<FindEstablishmentQuery, EstablishmentViewModel[]> {
  private readonly establishmentRepository: EstablishmentRepository;

  async execute(): Promise<EstablishmentViewModel[]> {

    const establishments = await this.establishmentRepository.find()

    return establishments.map(establishment => new EstablishmentViewModel(establishment));
  }
}
