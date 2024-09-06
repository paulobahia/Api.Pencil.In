import {IsString, IsInt, IsOptional, IsDate, IsBoolean} from 'class-validator';

class Establishment{

    @IsString()
    readonly id: string;

    @IsString()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly address: string;

    @IsString()
    @IsOptional()
    readonly phone: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsBoolean()
    isDeleted: Boolean;

    @IsDate()
    @IsOptional()
    deletedAt: Date | null;
}

export class FindEstablishmentResponseDto {
    readonly establishment: Establishment[];
}