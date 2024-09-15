import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindSchedulingByIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
