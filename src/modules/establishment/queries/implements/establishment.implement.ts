import { Injectable } from "@nestjs/common";
import { EstablishmentQuery } from "../establishment.query";
import { FindEstablishmentResult } from "../find-establishment.result";
import { PrismaService } from "src/infrastructure/database/prisma.service";

@Injectable()

export class EstablishmentQueryImplement implements EstablishmentQuery {
    constructor(private readonly prisma: PrismaService) {}
    
    async find(): Promise<FindEstablishmentResult> {
        const establishments = await this.prisma.establishment.findMany();
        return { establishments };
    }
}