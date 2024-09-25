import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOperationHourRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
