import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindAbsenceByIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
