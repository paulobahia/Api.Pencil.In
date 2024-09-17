import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindClientQuery } from '../implements/find-client.query';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { ClientRepository } from '../../interfaces/client-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ClientViewModel } from '../../viewmodels/client.viewmodel';

@QueryHandler(FindClientQuery)
export class FindClientHandler
  implements IQueryHandler<FindClientQuery, ClientViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.CLIENT_REPOSITORY)
  private readonly clientRepository: ClientRepository;

  async execute({ studioId }: FindClientQuery): Promise<ClientViewModel[]> {
    const studio =
      await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const clients = await this.clientRepository.find(studioId);

    return clients.map(client => new ClientViewModel(client))
  }
}
