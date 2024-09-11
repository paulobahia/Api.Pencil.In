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
import { EstablishmentId } from 'src/common/decorators/establishment-id.decorator';
import { EstablishmentIdGuard } from 'src/shared/guards/establishment-id.guard';
import { FindServiceQuery } from '../queries/implements/find-service.query';
import { CreateServiceRequestDto } from '../dtos/create-service-request.dto';
import { CreateServiceCommand } from '../commands/implements/create-service.command';
import { UpdateServiceCommand } from '../commands/implements/update-service.command';
import { UpdateServiceRequestParam } from '../dtos/update-service-request-param.dto';
import { UpdateServiceRequestDto } from '../dtos/update-service-request.dto';
import { FindServiceByIdRequestParam } from '../dtos/find-service-by-id-request-param.dto';
import { FindServiceByIdQuery } from '../queries/implements/find-service-by-id.query';
import { DeleteServiceRequestDto } from '../dtos/delete-service-request-param.dto';
import { DeleteServiceCommand } from '../commands/implements/delete-service.command';
import { ServiceViewModel } from '../viewmodels/service.viewmodel';

@ApiTags('Service')
@Controller('api/service')
export class ServiceController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: [ServiceViewModel] })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(EstablishmentIdGuard)
  async getService(@EstablishmentId() establishmentId: string,): Promise<ServiceViewModel> {
    const query = new FindServiceQuery(establishmentId);
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: ResponseDescription.CREATED, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @UseGuards(EstablishmentIdGuard)
  async createService(@Body() body: CreateServiceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const { name, description, durationMinutes, price } = body;
    const command = new CreateServiceCommand(
      establishmentId,
      name,
      description,
      durationMinutes,
      price,
    );
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async updateService(@Param() param: UpdateServiceRequestParam, @Body() body: UpdateServiceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const id = param.id;
    const { name, description, durationMinutes, price } = body;
    const command = new UpdateServiceCommand(
      establishmentId,
      id,
      name,
      description,
      durationMinutes,
      price,
    );
    return await this.commandBus.execute(command);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: ServiceViewModel, })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getServiceById(@Param() param: FindServiceByIdRequestParam, @EstablishmentId() establishmentId: string,): Promise<ServiceViewModel> {
    const id = param.id;
    const query = new FindServiceByIdQuery(id, establishmentId);
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiNotFoundResponse({ description: ResponseDescription.NOT_FOUND })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  async deleteService(@Param() param: DeleteServiceRequestDto, @EstablishmentId() establishmentId: string,): Promise<void> {
    const id = param.id;
    const command = new DeleteServiceCommand(id, establishmentId);
    return await this.commandBus.execute(command);
  }
}
