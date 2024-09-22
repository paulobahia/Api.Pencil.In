import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindStudioQuery } from '../queries/implements/find-studio.query';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseDescription } from 'src/common/constants/response-description.enum';
import { StudioViewModel } from '../viewmodels/studio.viewmodel';
import { FindStudiorByEmployeeIdRequestParam } from '../dtos/find-studio-by-employeeId-param.dto';
import { FindStudioByEmployeeIdQuery } from '../queries/implements/find-studio-by-employeeId.query';
import { FindStudiorByIdRequestParam } from '../dtos/find-studio-by-id-param.dto';
import { FindStudioByIdQuery } from '../queries/implements/find-studio-by-id.query';
import { CreateStudioRequestDto } from '../dtos/create-studio-request.dto';
import { CreateStudioCommand } from '../commands/implements/create-studio.command';
import { UpdateStudioRequestParam } from '../dtos/update-studio-request.param.dto';
import { UpdateStudioRequestDto } from '../dtos/update-studio-request.dto';
import { UpdateStudioCommand } from '../commands/implements/update-studio.command';
import { DeleteStudioRequestParam } from '../dtos/delete-studio-request.param.dto';
import { DeleteStudioCommand } from '../commands/implements/delete-studio.command';

@ApiTags('Studio')
@Controller('api/studio')
export class StudioController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: StudioViewModel })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getStudio(): Promise<StudioViewModel> {
    const query = new FindStudioQuery();
    return await this.queryBus.execute(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: StudioViewModel })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  async getStudioById(@Param() { id }: FindStudiorByIdRequestParam): Promise<StudioViewModel> {
    const query = new FindStudioByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  @Get("by-employee/:employeeId")
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [StudioViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getStudioByEmployeeId(@Param() { employeeId }: FindStudiorByEmployeeIdRequestParam): Promise<StudioViewModel[]> {
    const query = new FindStudioByEmployeeIdQuery(employeeId);
    return await this.queryBus.execute(query)
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async createStudio(@Body() body: CreateStudioRequestDto): Promise<void> {
    const { employeeId, name, address, description, phone } = body;
    const command = new CreateStudioCommand(employeeId, name, address, description, phone);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateStudio(@Param() { id }: UpdateStudioRequestParam, @Body() body: UpdateStudioRequestDto): Promise<void> {
    const { name, address, description, phone } = body;
    const command = new UpdateStudioCommand(id, name, address, description, phone);
    return await this.commandBus.execute(command);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteStudio(@Param() param: DeleteStudioRequestParam): Promise<void> {
    const id = param.id;
    const command = new DeleteStudioCommand(id);
    return await this.commandBus.execute(command);
  }
}
