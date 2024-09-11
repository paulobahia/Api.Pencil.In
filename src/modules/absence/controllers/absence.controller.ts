import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { EstablishmentId } from "src/common/decorators/establishment-id.decorator";
import { EstablishmentIdGuard } from "src/shared/guards/establishment-id.guard";
import { AbsenceViewModel } from "../viewmodels/absence.viewmodel";
import { FindAbsenceQuery } from "../queries/implements/find-absence.query";
import { CreateAbsenceRequestDto } from "../dtos/create-absence-request.dto";
import { CreateAbsenceCommand } from "../commands/implements/create-absence.command";
import { UpdateAbsenceRequestParam } from "../dtos/update-absence-request-param.dto";
import { UpdateAbsenceRequestDto } from "../dtos/update-absence-request.dto";
import { UpdateAbsenceCommand } from "../commands/implements/update-absence.command";
import { DeleteAbsenceRequestDto } from "../dtos/delete-absence-request-param.dto";
import { DeleteAbsenceCommand } from "../commands/implements/delete-absence.command";
import { FindAbsenceByIdRequestParam } from "../dtos/find-absence-by-id-request-param.dto";
import { FindAbsenceByIdQuery } from "../queries/implements/find-absence-by-id.query";

@ApiTags('Absence')
@Controller('api/absence')
export class AbsenceController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [AbsenceViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(EstablishmentIdGuard)
  async getAbsence(@EstablishmentId() establishmentId: string,): Promise<AbsenceViewModel> {
    const query = new FindAbsenceQuery(establishmentId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(EstablishmentIdGuard)
  async createAbsence(@Body() body: CreateAbsenceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const { date, employeeId, reason } = body;
    const command = new CreateAbsenceCommand(establishmentId, employeeId, date, reason);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateAbsence(@Param() param: UpdateAbsenceRequestParam, @Body() body: UpdateAbsenceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const id = param.id;
    const { employeeId, date, reason } = body;
    const command = new UpdateAbsenceCommand(establishmentId, id, employeeId, date, reason);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: AbsenceViewModel, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getAbsenceById(@Param() param: FindAbsenceByIdRequestParam, @EstablishmentId() establishmentId: string,): Promise<AbsenceViewModel> {
    const id = param.id;
    const query = new FindAbsenceByIdQuery(id, establishmentId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteAbsence(@Param() param: DeleteAbsenceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteAbsenceCommand(id, establishmentId);
    return await this.commandBus.execute(command);
  }
}