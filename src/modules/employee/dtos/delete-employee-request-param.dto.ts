import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteEmployeeRequestDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
