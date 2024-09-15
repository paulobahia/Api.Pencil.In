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
import { FindEmployeeQuery } from '../queries/implements/find-employee.query';
import { StudioId } from 'src/common/decorators/studio-id.decorator';
import { StudioIdGuard } from 'src/shared/guards/studio-id.guard';
import { CreateEmployeeCommand } from '../commands/implements/create-employee.command';
import { CreateEmployeeRequestDto } from '../dtos/create-employee-request.dto';
import { UpdateEmployeeRequestParam } from '../dtos/update-employee-request.dto';
import { UpdateEmployeeRequestDto } from '../dtos/update-employee-request-param.dto';
import { UpdateEmployeeCommand } from '../commands/implements/update-employee.command';
import { FindEmployeeByIdQuery } from '../queries/implements/find-employee-by-id.query';
import { DeleteEmployeeRequestDto } from '../dtos/delete-employee-request-param.dto';
import { DeleteEmployeeCommand } from '../commands/implements/delete-employee.command';
import { FindEmployeeByIdRequestParam } from '../dtos/find-employee-by-id-request-param.dto';
import { EmployeeViewModel } from '../viewmodels/employee.viewmodel';

@ApiTags('Employee')
@Controller('api/employee')
export class EmployeeController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [EmployeeViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async getEmployee(@StudioId() studioId: string,): Promise<EmployeeViewModel[]> {
    const query = new FindEmployeeQuery(studioId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(StudioIdGuard)
  async createEmployee(@Body() body: CreateEmployeeRequestDto, @StudioId() studioId: string,): Promise<void> {
    const { email, name, password } = body;
    const command = new CreateEmployeeCommand(studioId, email, name, password);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateEmployee(@Param() param: UpdateEmployeeRequestParam, @Body() body: UpdateEmployeeRequestDto, @StudioId() studioId: string,): Promise<void> {
    const id = param.id;
    const { email, name } = body;
    const command = new UpdateEmployeeCommand(studioId, id, name, email);
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: EmployeeViewModel })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  async getEmployeeById(@Param() param: FindEmployeeByIdRequestParam, @StudioId() studioId: string): Promise<EmployeeViewModel> {
    const id = param.id;
    const query = new FindEmployeeByIdQuery(id, studioId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteEmployee(@Param() param: DeleteEmployeeRequestDto, @StudioId() studioId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteEmployeeCommand(id, studioId);
    return await this.commandBus.execute(command);
  }
}
