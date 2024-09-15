import { ApiProperty } from '@nestjs/swagger';
import { SchedulingStatus } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateSchedulingRequestDto {
  @ApiProperty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  readonly servicesIds: string[];

  @ApiProperty()
  @IsDate()
  readonly schedulingTime: Date;

  @ApiProperty()
  @IsEnum({ SchedulingStatus })
  readonly staus: SchedulingStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly notes?: string;
}
