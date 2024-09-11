import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateAbsenceRequestDto {
  
  @ApiProperty()
  @IsString()
  readonly employeeId: string

  @ApiProperty()
  @IsDate()
  readonly date: Date;

  @ApiProperty()
  @IsString()
  readonly reason: string;
}
