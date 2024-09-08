import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateEmployeeRequestDto {

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly email: string;
}