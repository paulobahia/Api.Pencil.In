import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindClientByIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
