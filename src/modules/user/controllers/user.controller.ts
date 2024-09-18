import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseDescription } from 'src/common/constants/response-description.enum';
import { FindUserQuery } from '../queries/implements/find-user.query';
import { CreateUserCommand } from '../commands/implements/create-user.command';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { UpdateUserRequestParam } from '../dtos/update-user-request.dto';
import { UpdateUserRequestDto } from '../dtos/update-user-request-param.dto';
import { UpdateUserCommand } from '../commands/implements/update-user.command';
import { FindUserByIdQuery } from '../queries/implements/find-user-by-id.query';
import { DeleteUserRequestDto } from '../dtos/delete-user-request-param.dto';
import { DeleteUserCommand } from '../commands/implements/delete-user.command';
import { FindUserByIdRequestParam } from '../dtos/find-user-by-id-request-param.dto';
import { UserViewModel } from '../viewmodels/user.viewmodel';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [UserViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getUser(): Promise<UserViewModel[]> {
    const query = new FindUserQuery();
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async createUser(@Body() body: CreateUserRequestDto): Promise<void> {
    const { email, name, phone, password } = body;
    const command = new CreateUserCommand(email, name, password, phone);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateUser(@Param() param: UpdateUserRequestParam, @Body() body: UpdateUserRequestDto,): Promise<void> {
    const id = param.id;
    const { email, name } = body;
    const command = new UpdateUserCommand(id, name, email);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: UserViewModel })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  async getUserById(@Param() param: FindUserByIdRequestParam): Promise<UserViewModel> {
    const id = param.id;
    const query = new FindUserByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteUser(@Param() param: DeleteUserRequestDto,): Promise<void> {
    const id = param.id;
    const command = new DeleteUserCommand(id);
    return await this.commandBus.execute(command);
  }
}
