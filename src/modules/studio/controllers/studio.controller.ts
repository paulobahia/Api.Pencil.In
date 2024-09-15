import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindStudioResponseDto } from '../dtos/find-studio-response.dto';
import { FindStudioQuery } from '../queries/implements/find-studio.query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDescription } from 'src/common/constants/response-description.enum';

@ApiTags('Studio')
@Controller('api/studio')
export class StudioController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus,) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK, type: FindStudioResponseDto, })
  async getStudio(): Promise<FindStudioResponseDto> {
    const query = new FindStudioQuery();
    return await this.queryBus.execute(query);
  }
}
