import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FindEmployeeByIdRequestDto {
  
  @ApiProperty()
  @IsString()
  readonly id: string;
}