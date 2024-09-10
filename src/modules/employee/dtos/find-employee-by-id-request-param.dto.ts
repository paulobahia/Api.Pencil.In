import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindEmployeeByIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
