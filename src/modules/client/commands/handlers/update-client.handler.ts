import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateClientCommand } from '../implements/update-client.command';
import { Inject } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ClientRepository } from '../../interfaces/client-repository.interface';
import { UpdateClientModel } from '../../models/update-client.model';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler implements ICommandHandler<UpdateClientCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.CLIENT_REPOSITORY)
  private readonly clientRepository: ClientRepository;

  async execute(command: UpdateClientCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const client = await this.clientRepository.findById(command.id, studioId);

    if (!client) {
      throw new NotFoundException("Usuário");
    }

    const updateClient = new UpdateClientModel(studioId, command);

    await this.clientRepository.update(updateClient);
  }
}
