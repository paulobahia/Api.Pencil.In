import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSchedulingRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
