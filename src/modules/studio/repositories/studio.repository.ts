import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepository } from '../interfaces/studio.interface';
import { Studio } from '@prisma/client';

@Injectable()
export class StudioRepositoryImplement implements StudioRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(): Promise<Studio[]> {
    const studios = await this.prisma.studio.findMany();
    return studios
  }

  async findById(id: string): Promise<Studio | null> {
    const studio = await this.prisma.studio.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!studio) return null;

    return studio;
  }
}
