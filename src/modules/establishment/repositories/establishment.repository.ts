import { Injectable } from "@nestjs/common";
import { FindEstablishmentResult } from "../queries/implements/find-establishment.result";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { EstablishmentMapper } from "../queries/mappers/establishment.mapper";
import { FindEstablishmentByIdResult } from "../queries/implements/find-establishment-by-id.result";
import { EstablishmentRepository } from "../interfaces/establishment.interface";

@Injectable()
export class EstablishmentRepositoryImplement implements EstablishmentRepository {
    constructor(private readonly prisma: PrismaService) { }

    async find(): Promise<FindEstablishmentResult> {
        const establishments = await this.prisma.establishment.findMany();
        return { establishments: establishments.map(EstablishmentMapper.toDomain) };
    }

    async findById(id: string): Promise<FindEstablishmentByIdResult | null> {

        const establishment = await this.prisma.establishment.findUnique({
            where: {
                id,
                isDeleted: false
            }
        })

        if (!establishment) return null;

        return EstablishmentMapper.toDomain(establishment);
    }
}