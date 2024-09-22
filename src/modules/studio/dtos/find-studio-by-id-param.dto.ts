import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindStudiorByIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
