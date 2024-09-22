import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepository } from '../interfaces/studio.interface';
import { Studio } from '@prisma/client';
import { CreateStudioModel } from '../models/create-studio.model';
import { UpdateStudioModel } from '../models/update-studio.model';

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

  async findByEmployeeId(employeeId: string): Promise<Studio[]> {
    const studio = await this.prisma.studio.findMany({
      where: {
        employees: { some: { id: employeeId } },
        isDeleted: false
      }
    })

    return studio
  }

  async create(studio: CreateStudioModel): Promise<void> {
    const { name, description, address, phone, employeeId } = studio

    await this.prisma.studio.create({
      data: {
        name,
        description,
        address,
        phone,
        employees: { connect: { id: employeeId } }
      },
    });
  }

  async update(studio: UpdateStudioModel): Promise<void> {
    const { id, name, description, address, phone } = studio

    await this.prisma.studio.update({
      where: { id },
      data: {
        name,
        description,
        address,
        phone
      }
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.studio.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      }
    })
  }
}
