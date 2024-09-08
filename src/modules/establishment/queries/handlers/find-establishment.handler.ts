import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindEstablishmentQuery } from "../implements/find-establishment.query";
import { FindEstablishmentResult } from "../implements/find-establishment.result";
import { EstablishmentRepository } from "../../interfaces/establishment.interface";

@QueryHandler(FindEstablishmentQuery)
export class FindEstablishmentHandler implements IQueryHandler<FindEstablishmentQuery, FindEstablishmentResult> {
    private readonly establishmentRepository: EstablishmentRepository

    async execute(): Promise<FindEstablishmentResult> {
        return await this.establishmentRepository.find()
    }
}