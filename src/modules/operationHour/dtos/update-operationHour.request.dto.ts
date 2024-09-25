import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek } from "@prisma/client";
import { IsArray, IsBoolean, IsDate, IsEnum, IsMilitaryTime, IsOptional, IsString } from "class-validator";

class TimeIntervals {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsMilitaryTime()
  readonly startTime: string;

  @ApiProperty()
  @IsMilitaryTime()
  readonly endTime: string;
}

class Exceptions {
  @ApiProperty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsDate()
  readonly exceptionDate: Date;

  @ApiProperty({ type: [TimeIntervals] })
  @IsArray()
  readonly timeIntervals: TimeIntervals[];
}

export class UpdateOperationHourRequestDto {
  @ApiProperty({ enum: DayOfWeek, isArray: true })
  @IsArray()
  @IsEnum(DayOfWeek)
  readonly dayOfWeek: DayOfWeek[];

  @ApiProperty({ type: [TimeIntervals] })
  @IsArray()
  readonly timeIntervals: TimeIntervals[];

  @ApiProperty()
  @IsBoolean()
  readonly isDefault: boolean

  @ApiProperty({ type: [Exceptions] })
  @IsOptional()
  @IsArray()
  readonly exceptions?: Exceptions[];
}