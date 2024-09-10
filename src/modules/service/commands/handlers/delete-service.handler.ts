import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteServiceCommand } from '../implements/delete-service.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { ServiceRepository } from '../../interfaces/service.interface';

@CommandHandler(DeleteServiceCommand)
export class DeleteServiceHandler
  implements ICommandHandler<DeleteServiceCommand, void>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute(command: DeleteServiceCommand): Promise<void> {
    const { id, establishmentId } = command;
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const service = await this.serviceRepository.findById(
      command.id,
      establishmentId,
    );

    if (!service) {
      throw new NotFoundException();
    }

    await this.serviceRepository.delete(id, establishmentId);
  }
}
