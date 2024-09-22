import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindStudiorByEmployeeIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly employeeId: string;
}
