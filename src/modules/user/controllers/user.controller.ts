import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { StudioId } from "src/common/decorators/studio-id.decorator";
import { StudioIdGuard } from "src/shared/guards/studio-id.guard";
import { UserViewModel } from "../viewmodels/user.viewmodel";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { DeleteUserRequestDto } from "../dtos/delete-user-request-param.dto";
import { FindUserByIdRequestParam } from "../dtos/find-user-by-id-request-param.dto";
import { UpdateUserRequestParam } from "../dtos/update-user-request-param.dto";
import { UpdateUserRequestDto } from "../dtos/update-user-request.dto";
import { FindUserByIdQuery } from "../queries/implements/find-user-by-id.query";
import { FindUserQuery } from "../queries/implements/find-user.query";
import { CreateUserCommand } from "../commands/implements/create-user.command";
import { DeleteUserCommand } from "../commands/implements/delete-user.command";
import { UpdateUserCommand } from "../commands/implements/update-user.command";

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [UserViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async getUser(@StudioId() studioId: string): Promise<UserViewModel> {
    const query = new FindUserQuery(studioId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async createUser(@Body() body: CreateUserRequestDto, @StudioId() studioId: string): Promise<void> {
    const { name, phone } = body;
    const command = new CreateUserCommand(studioId, name, phone);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateUser(@Param() param: UpdateUserRequestParam, @Body() body: UpdateUserRequestDto, @StudioId() studioId: string): Promise<void> {
    const id = param.id;
    const { name, phone } = body;
    const command = new UpdateUserCommand(studioId, id, name, phone);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: UserViewModel, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getUserById(@Param() param: FindUserByIdRequestParam, @StudioId() studioId: string,): Promise<UserViewModel> {
    const id = param.id;
    const query = new FindUserByIdQuery(id, studioId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteUser(@Param() param: DeleteUserRequestDto, @StudioId() studioId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteUserCommand(id, studioId);
    return await this.commandBus.execute(command);
  }
}