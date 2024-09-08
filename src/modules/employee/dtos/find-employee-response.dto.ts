import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

class Employee {

  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsBoolean()
  isDeleted: Boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt: Date | null;
}

export class FindEmployeeResponseDto {
  @ApiProperty({ type: [Employee] })
  readonly employee: Employee[];
}