import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
