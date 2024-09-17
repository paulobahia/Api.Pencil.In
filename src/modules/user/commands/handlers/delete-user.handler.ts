import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteClientCommand } from '../implements/delete-client.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { ClientRepository } from '../../interfaces/client-repository.interface';

@CommandHandler(DeleteClientCommand)
export class DeleteClientHandler implements ICommandHandler<DeleteClientCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.CLIENT_REPOSITORY)
  private readonly clientRepository: ClientRepository;

  async execute(command: DeleteClientCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { id, studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const client = await this.clientRepository.findById(command.id, studioId);

    if (!client) {
      throw new NotFoundException("Usuário");
    }

    await this.clientRepository.delete(id, studioId);
  }
}
