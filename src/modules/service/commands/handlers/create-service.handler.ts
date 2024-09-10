import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { ServiceRepository } from "../../interfaces/service.interface"
import { EstablishmentRepository } from "src/modules/establishment/interfaces/establishment.interface"
import { InjectionToken } from "src/modules/injection-token"
import { Inject, NotFoundException } from "@nestjs/common"
import { CreateServiceCommand } from "../implements/create-service.command"
import { CreateServiceModel } from "../../models/create-service.model"

@CommandHandler(CreateServiceCommand)
export class CreateServiceHandler implements ICommandHandler<CreateServiceCommand, void> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository

  async execute(command: CreateServiceCommand): Promise<void> {
    const { establishmentId } = command
    const establishment = await this.establishmentRepository.findById(establishmentId)

    if (!establishment) {
      throw new NotFoundException()
    }

    const createService = new CreateServiceModel(establishmentId, command);

    await this.serviceRepository.create(createService)
  }
}