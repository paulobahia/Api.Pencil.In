import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';

class Studio {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt: Date | null;
}

export class FindStudioResponseDto {
  @ApiProperty({ type: [Studio] })
  readonly studio: Studio[];
}
