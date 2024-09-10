import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateServiceCommand } from '../implements/update-service.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { ServiceRepository } from '../../interfaces/service.interface';
import { UpdateServiceModel } from '../../models/update-service.model';

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceHandler
  implements ICommandHandler<UpdateServiceCommand, void>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository;

  async execute(command: UpdateServiceCommand): Promise<void> {
    const establishment = await this.establishmentRepository.findById(
      command.establishmentId,
    );
    const { establishmentId } = command;

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

    const updateService = new UpdateServiceModel(establishmentId, command);

    await this.serviceRepository.update(updateService);
  }
}
