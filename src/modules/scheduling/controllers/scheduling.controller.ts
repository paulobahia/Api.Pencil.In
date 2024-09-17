import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { StudioId } from "src/common/decorators/studio-id.decorator";
import { StudioIdGuard } from "src/shared/guards/studio-id.guard";
import { SchedulingViewModel } from "../viewmodels/scheduling.viewmodel";
import { CreateSchedulingRequestDto } from "../dtos/create-scheduling-request.dto";
import { DeleteSchedulingRequestDto } from "../dtos/delete-scheduling-request-param.dto";
import { FindSchedulingByIdRequestParam } from "../dtos/find-scheduling-by-id-request-param.dto";
import { UpdateSchedulingRequestParam } from "../dtos/update-scheduling-request-param.dto";
import { UpdateSchedulingRequestDto } from "../dtos/update-scheduling-request.dto";
import { FindSchedulingByIdQuery } from "../queries/implements/find-scheduling-by-id.query";
import { FindSchedulingQuery } from "../queries/implements/find-scheduling.query";
import { CreateSchedulingCommand } from "../commands/implements/create-scheduling.command";
import { DeleteSchedulingCommand } from "../commands/implements/delete-scheduling.command";
import { UpdateSchedulingCommand } from "../commands/implements/update-scheduling.command";

@ApiTags('Scheduling')
@Controller('api/scheduling')
export class SchedulingController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [SchedulingViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async getScheduling(@StudioId() studioId: string): Promise<SchedulingViewModel> {
    const query = new FindSchedulingQuery(studioId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async createScheduling(@Body() body: CreateSchedulingRequestDto, @StudioId() studioId: string): Promise<void> {
    const { clientId, servicesIds, schedulingTime, staus, notes } = body;
    const command = new CreateSchedulingCommand(studioId, clientId, servicesIds, schedulingTime, staus, notes);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateScheduling(@Param() param: UpdateSchedulingRequestParam, @Body() body: UpdateSchedulingRequestDto, @StudioId() studioId: string): Promise<void> {
    const id = param.id;
    const { servicesIds, schedulingTime, staus, notes } = body;
    const command = new UpdateSchedulingCommand(studioId, id, servicesIds, schedulingTime, staus, notes);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: SchedulingViewModel, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getSchedulingById(@Param() param: FindSchedulingByIdRequestParam, @StudioId() studioId: string,): Promise<SchedulingViewModel> {
    const id = param.id;
    const query = new FindSchedulingByIdQuery(id, studioId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteScheduling(@Param() param: DeleteSchedulingRequestDto, @StudioId() studioId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteSchedulingCommand(id, studioId);
    return await this.commandBus.execute(command);
  }
}