import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsPhoneNumber()
  readonly phone: string;
}
