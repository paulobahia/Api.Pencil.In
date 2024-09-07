import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsBoolean } from 'class-validator';
import { FindEstablishmentResult } from '../queries/implements/find-establishment.result';

class Establishment extends FindEstablishmentResult {

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
    isDeleted: Boolean;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    deletedAt: Date | null;
}

export class FindEstablishmentResponseDto {
    @ApiProperty({ type: [Establishment] })
    readonly establishment: Establishment[];
}