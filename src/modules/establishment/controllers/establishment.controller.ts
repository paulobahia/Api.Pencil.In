import { Controller, Get, HttpStatus } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FindEstablishmentResponseDto } from "../dtos/find-establishment-response.dto";
import { FindEstablishmentQuery } from "../queries/implements/find-establishment.query";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";

@ApiTags('Establishment')
@Controller('api/establishment')
export class EstablishmentController {
    constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: FindEstablishmentResponseDto })
    async getEstablishment(): Promise<FindEstablishmentResponseDto> {
        const query = new FindEstablishmentQuery();
        return await this.queryBus.execute(query);
    }
}