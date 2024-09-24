import { ApiProperty } from "@nestjs/swagger";
import { DayOfWeek } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsMilitaryTime, IsOptional, IsString, IsTimeZone } from "class-validator";

class TimeIntervals {
  @ApiProperty()
  @IsMilitaryTime()
  readonly startTime: string;

  @ApiProperty()
  @IsMilitaryTime()
  readonly endTime: string;
}

class Exceptions {
  @ApiProperty()
  @IsDate()
  readonly exceptionDate: Date;

  @ApiProperty({ type: [TimeIntervals] })
  @IsArray()
  readonly timeIntervals: TimeIntervals[];
}

export class CreateOperationHourRequestDto {
  @ApiProperty({ enum: DayOfWeek, isArray: true })
  @IsArray()
  @IsEnum(DayOfWeek)
  readonly dayOfWeek: DayOfWeek[];

  @ApiProperty()
  @IsOptional()
  @IsDate()
  readonly specificDate?: Date;

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