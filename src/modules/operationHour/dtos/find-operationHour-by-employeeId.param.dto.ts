import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindOperationHourByEmployeeIdRequestParam {
  @ApiProperty()
  @IsString()
  readonly employeeId: string;
}
