import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateClientRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
