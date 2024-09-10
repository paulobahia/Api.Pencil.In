import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../interfaces/service.interface';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { FindServiceResult } from '../queries/implements/find-service.result';
import { ServiceMapper } from '../queries/mappers/service.mapper';
import { CreateServiceModel } from '../models/create-service.model';
import { UpdateServiceModel } from '../models/update-service.model';
import { FindServiceByIdResult } from '../queries/implements/find-service-by-id.result';

@Injectable()
export class ServiceRepositoryImplement implements ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(
    id: string,
    establishmentId: string,
  ): Promise<FindServiceByIdResult | null> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
        establishmentId,
        isDeleted: false,
      },
    });

    if (!service) {
      return null;
    }

    return { service: ServiceMapper.toDomain(service) };
  }

  async find(establishmentId: string): Promise<FindServiceResult> {
    const services = await this.prisma.service.findMany({
      where: {
        establishmentId,
        isDeleted: false,
      },
    });

    if (!services) {
      return null;
    }

    return { services: services.map(ServiceMapper.toDomain) };
  }

  async create(service: CreateServiceModel): Promise<void> {
    const { name, description, durationMinutes, price, establishmentId } =
      service;

    await this.prisma.service.create({
      data: {
        name,
        description,
        durationMinutes,
        price,
        establishmentId,
      },
    });
  }

  async update(employee: UpdateServiceModel) {
    const { id, name, description, durationMinutes, price, establishmentId } =
      employee;

    await this.prisma.service.update({
      where: {
        id,
        establishmentId,
      },
      data: {
        name,
        description,
        durationMinutes,
        price,
      },
    });
  }

  async delete(id: string, establishmentId: string) {
    await this.prisma.service.update({
      where: {
        id,
        establishmentId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
