import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteSchedulingRequestDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
