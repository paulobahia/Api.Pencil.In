import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { StudioId } from "src/common/decorators/studio-id.decorator";
import { StudioIdGuard } from "src/shared/guards/studio-id.guard";
import { ClientViewModel } from "../viewmodels/client.viewmodel";
import { CreateClientRequestDto } from "../dtos/create-client-request.dto";
import { DeleteClientRequestDto } from "../dtos/delete-client-request-param.dto";
import { FindClientByIdRequestParam } from "../dtos/find-client-by-id-request-param.dto";
import { UpdateClientRequestParam } from "../dtos/update-client-request-param.dto";
import { UpdateClientRequestDto } from "../dtos/update-client-request.dto";
import { FindClientByIdQuery } from "../queries/implements/find-client-by-id.query";
import { FindClientQuery } from "../queries/implements/find-client.query";
import { CreateClientCommand } from "../commands/implements/create-client.command";
import { DeleteClientCommand } from "../commands/implements/delete-client.command";
import { UpdateClientCommand } from "../commands/implements/update-client.command";

@ApiTags('Client')
@Controller('api/client')
export class ClientController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [ClientViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async getClient(@StudioId() studioId: string): Promise<ClientViewModel> {
    const query = new FindClientQuery(studioId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async createClient(@Body() body: CreateClientRequestDto, @StudioId() studioId: string): Promise<void> {
    const { name, phone } = body;
    const command = new CreateClientCommand(studioId, name, phone);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateClient(@Param() param: UpdateClientRequestParam, @Body() body: UpdateClientRequestDto, @StudioId() studioId: string): Promise<void> {
    const id = param.id;
    const { name, phone } = body;
    const command = new UpdateClientCommand(studioId, id, name, phone);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: ClientViewModel, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getClientById(@Param() param: FindClientByIdRequestParam, @StudioId() studioId: string,): Promise<ClientViewModel> {
    const id = param.id;
    const query = new FindClientByIdQuery(id, studioId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteClient(@Param() param: DeleteClientRequestDto, @StudioId() studioId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteClientCommand(id, studioId);
    return await this.commandBus.execute(command);
  }
}