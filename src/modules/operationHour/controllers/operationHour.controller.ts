import { Body, Controller, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { OperationHourViewModel } from "../viewmodels/operationHour.viewmodel";
import { FindOperationHourQuery } from "../queries/implements/find-operationHour.query";
import { StudioId } from "src/common/decorators/studio-id.decorator";
import { StudioIdGuard } from "src/shared/guards/studio-id.guard";
import { CreateOperationHourRequestDto } from "../dtos/create-operationHour.request.dto";
import { EmployeeIdGuard } from "src/shared/guards/employee-id.guard";
import { EmployeeId } from "src/common/decorators/employee-id.decorator";
import { CreateOperationHourCommand } from "../commands/implements/create-operationHour.command";
import { UpdateOperationHourRequestParam } from "../dtos/update-operationHour.request-param.dto";
import { UpdateOperationHourRequestDto } from "../dtos/update-operationHour.request.dto";
import { UpdateOperationHourCommand } from "../commands/implements/update-operationHour.command";

@ApiTags('OperationHour')
@Controller('api/operationHour')
export class OperationHourController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [OperationHourViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  @UseGuards(EmployeeIdGuard)
  async getOperationHourByEmployeeId(@StudioId() studioId: string, @EmployeeId() employeeId: string): Promise<OperationHourViewModel[]> {
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
  async createOperationHour(@Body() body: CreateOperationHourRequestDto, @StudioId() studioId: string, @EmployeeId() employeeId: string): Promise<void> {
    const { dayOfWeek, exceptions, isDefault, timeIntervals } = body;
    const command = new CreateOperationHourCommand(studioId, employeeId, dayOfWeek, isDefault, timeIntervals, exceptions);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  @UseGuards(EmployeeIdGuard)
  async updateOperationHour(@Param() param: UpdateOperationHourRequestParam, @Body() body: UpdateOperationHourRequestDto, @StudioId() studioId: string, @EmployeeId() employeeId: string): Promise<void> {
    const id = param.id;
    const { dayOfWeek, isDefault, timeIntervals, exceptions } = body;
    const command = new UpdateOperationHourCommand(studioId, employeeId, id, dayOfWeek, isDefault, timeIntervals, exceptions);
    return await this.commandBus.execute(command);
  }
}