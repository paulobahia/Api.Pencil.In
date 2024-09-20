import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetEmployeeByUserIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly userId: string;
}
