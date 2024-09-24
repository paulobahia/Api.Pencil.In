import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from '../implements/create-client.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { ClientRepository } from '../../interfaces/client-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { CreateClientModel } from '../../models/create-client.model';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler<CreateClientCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.CLIENT_REPOSITORY)
  private readonly clientRepository: ClientRepository;

  async execute(command: CreateClientCommand): Promise<void> {
    const { studioId } = command;

    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const createClient = new CreateClientModel(studioId, command);

    await this.clientRepository.create(createClient);
  }
}
