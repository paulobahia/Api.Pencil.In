import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateStudioRequestDto {
  @ApiProperty()
  @IsString()
  readonly employeeId: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsPhoneNumber()
  readonly address: string;

  @ApiProperty()
  @IsEmail()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  readonly description: string;
}
