import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { EstablishmentRepository } from '../interfaces/establishment.interface';
import { Establishment } from '@prisma/client';

@Injectable()
export class EstablishmentRepositoryImplement implements EstablishmentRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(): Promise<Establishment[]> {
    const establishments = await this.prisma.establishment.findMany();
    return establishments
  }

  async findById(id: string): Promise<Establishment | null> {
    const establishment = await this.prisma.establishment.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!establishment) return null;

    return establishment;
  }
}
