import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteUserRequestDto {
  @ApiProperty()
  @IsString()
  readonly id: string;
}
