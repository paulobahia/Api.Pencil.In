import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteStudioRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
