import { Controller, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindEstablishmentResponseDto } from "../dtos/find-establishment-response.dto";
import { FindEstablishmentQuery } from "../queries/find-establishment.query";

@Controller('api/establishment')
export class EstablishmentController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

    @Get()
    async getEstablishment(): Promise<FindEstablishmentResponseDto> {
        const query = new FindEstablishmentQuery();
        return await this.queryBus.execute(query);
    }
}