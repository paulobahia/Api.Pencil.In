import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindClientByIdQuery } from '../implements/find-client-by-id.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ClientRepository } from '../../interfaces/client-repository.interface';
import { ClientViewModel } from '../../viewmodels/client.viewmodel';

@QueryHandler(FindClientByIdQuery)
export class FindClientByIdHandler
  implements IQueryHandler<FindClientByIdQuery, ClientViewModel> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.CLIENT_REPOSITORY)
  private readonly clientRepository: ClientRepository;

  async execute({ id, studioId }: FindClientByIdQuery): Promise<ClientViewModel> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const client = await this.clientRepository.findById(id, studioId);

    return new ClientViewModel(client)
  }
}
