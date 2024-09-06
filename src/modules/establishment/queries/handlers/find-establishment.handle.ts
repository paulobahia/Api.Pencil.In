import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindEstablishmentQuery } from "../find-establishment.query";
import { FindEstablishmentResult } from "../find-establishment.result";
import { Inject } from "@nestjs/common";
import { InjectionToken } from "../../injection-token";
import { EstablishmentQuery } from "../establishment.query";

@QueryHandler(FindEstablishmentQuery)
export class FindEstablishmentHandler implements IQueryHandler<FindEstablishmentQuery, FindEstablishmentResult>{
    @Inject(InjectionToken.ESTABLISHMENT_QUERY)
    private readonly establishmentQuery: EstablishmentQuery
    execute(): Promise<FindEstablishmentResult> {
        return this.establishmentQuery.find()
    }
    
}