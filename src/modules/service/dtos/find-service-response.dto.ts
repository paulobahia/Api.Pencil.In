import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

class Service {

  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  readonly durationMinutes: number;

  @ApiProperty()
  @IsNumber()
  readonly price: number;

  @ApiProperty()
  @IsString()
  readonly establishmentId: string;

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDate()
  readonly updatedAt: Date;

  @ApiProperty()
  @IsBoolean()
  readonly isDeleted: Boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  readonly deletedAt: Date | null;
}

export class FindServiceResponseDto {
  @ApiProperty({ type: [Service] })
  readonly service: Service[];
}