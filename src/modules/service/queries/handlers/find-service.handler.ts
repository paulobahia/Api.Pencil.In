import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindServiceQuery } from "../implements/find-service.query";
import { FindServiceResult } from "../implements/find-service.result";
import { InjectionToken } from "src/modules/injection-token";
import { Inject, NotFoundException } from "@nestjs/common";
import { EstablishmentRepository } from "src/modules/establishment/interfaces/establishment.interface";
import { ServiceRepository } from "../../interfaces/service.interface";

@QueryHandler(FindServiceQuery)
export class FindServiceHandler implements IQueryHandler<FindServiceQuery, FindServiceResult> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository
  @Inject(InjectionToken.SERVICE_REPOSITORY)
  private readonly serviceRepository: ServiceRepository

  async execute({ establishmentId }: FindServiceQuery): Promise<FindServiceResult> {
    const establishment = await this.establishmentRepository.findById(establishmentId)

    if (!establishment) {
      throw new NotFoundException()
    }

    return await this.serviceRepository.find(establishmentId)
  }
}