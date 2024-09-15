import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../interfaces/service.interface';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CreateServiceModel } from '../models/create-service.model';
import { UpdateServiceModel } from '../models/update-service.model';
import { Service } from '@prisma/client';

@Injectable()
export class ServiceRepositoryImplement implements ServiceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string, studioId: string): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
        studioId,
        isDeleted: false,
      },
    });

    if (!service) {
      return null;
    }

    return service
  }

  async findByIds(ids: string[], studioId: string): Promise<string[]> {
    const services = await this.prisma.service.findMany({
      where: {
        id: { in: ids },
        studioId,
        isDeleted: false,
      },
      select: { id: true }
    });

    return services.map(service => service.id);
  }

  async find(studioId: string): Promise<Service[]> {
    const services = await this.prisma.service.findMany({
      where: {
        studioId,
        isDeleted: false,
      },
    });

    return services
  }

  async create(service: CreateServiceModel): Promise<void> {
    const { name, description, durationMinutes, price, studioId } = service;

    await this.prisma.service.create({
      data: {
        name,
        description,
        durationMinutes,
        price,
        studioId,
      },
    });
  }

  async update(employee: UpdateServiceModel) {
    const { id, name, description, durationMinutes, price, studioId } = employee;

    await this.prisma.service.update({
      where: {
        id,
        studioId,
      },
      data: {
        name,
        description,
        durationMinutes,
        price,
      },
    });
  }

  async delete(id: string, studioId: string) {
    await this.prisma.service.update({
      where: {
        id,
        studioId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
