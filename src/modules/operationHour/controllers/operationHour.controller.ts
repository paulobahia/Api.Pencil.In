import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { OperationHourViewModel } from "../viewmodels/operationHour.viewmodel";
import { FindOperationHourQuery } from "../queries/implements/find-operationHour.query";
import { StudioId } from "src/common/decorators/studio-id.decorator";
import { StudioIdGuard } from "src/shared/guards/studio-id.guard";
import { FindOperationHourByEmployeeIdRequestParam } from "../dtos/find-operationHour-by-employeeId.param.dto";
import { CreateOperationHourRequestDto } from "../dtos/create-operationHour.request.dto";
import { EmployeeIdGuard } from "src/shared/guards/employee-id.guard";
import { employeeId } from "src/common/decorators/employee-id.decorator";
import { CreateOperationHourCommand } from "../commands/implements/create-operationHour.command";

@ApiTags('OperationHour')
@Controller('api/operationHour')
export class OperationHourController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get(':employeeId')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [OperationHourViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async getOperationHourByEmployeeId(@Param() { employeeId }: FindOperationHourByEmployeeIdRequestParam, @StudioId() studioId: string): Promise<OperationHourViewModel[]> {
    const query = new FindOperationHourQuery(studioId, employeeId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  @UseGuards(EmployeeIdGuard)
  async createAbsence(@Body() body: CreateOperationHourRequestDto, @StudioId() studioId: string, @employeeId() employeeId: string): Promise<void> {
    const { dayOfWeek, exceptions, isDefault, timeIntervals, specificDate } = body;
    const command = new CreateOperationHourCommand(studioId, employeeId, dayOfWeek, isDefault, timeIntervals, exceptions, specificDate);
    return await this.commandBus.execute(command);
  }
}