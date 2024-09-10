import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { EstablishmentId } from "src/common/decorators/establishment-id.decorator";
import { EstablishmentIdGuard } from "src/shared/guards/establishment-id.guard";
import { FindServiceResponseDto } from "../dtos/find-service-response.dto";
import { FindServiceQuery } from "../queries/implements/find-service.query";
import { CreateServiceRequestDto } from "../dtos/create-service-request.dto";
import { CreateServiceCommand } from "../commands/implements/create-service.command";

@ApiTags('Service')
@Controller('api/service')
export class ServiceController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: FindServiceResponseDto })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  @UseGuards(EstablishmentIdGuard)
  async getService(@EstablishmentId() establishmentId: string): Promise<FindServiceResponseDto> {
    const query = new FindServiceQuery(establishmentId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  @UseGuards(EstablishmentIdGuard)
  async createService(@Body() body: CreateServiceRequestDto, @EstablishmentId() establishmentId: string): Promise<void> {
    const { name, description, durationMinutes, price } = body
    const command = new CreateServiceCommand(establishmentId, name, description, durationMinutes, price);
    return await this.commandBus.execute(command);
  }
}