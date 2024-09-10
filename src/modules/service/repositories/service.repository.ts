import { Injectable } from "@nestjs/common";
import { ServiceRepository } from "../interfaces/service.interface";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { FindServiceResult } from "../queries/implements/find-service.result";
import { ServiceMapper } from "../queries/mappers/service.mapper";
import { CreateServiceModel } from "../models/create-service.model";

@Injectable()
export class ServiceRepositoryImplement implements ServiceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(establishmentId: string): Promise<FindServiceResult> {
    const services = await this.prisma.service.findMany({
      where: {
        establishmentId,
        isDeleted: false
      }
    });

    if (!services) {
      return null
    }

    return { services: services.map(ServiceMapper.toDomain) };
  }

  async create(service: CreateServiceModel): Promise<void> {
    const { name, description, durationMinutes, price, establishmentId } = service

    await this.prisma.service.create({
      data: {
        name,
        description,
        durationMinutes,
        price,
        establishmentId
      }
    })
  }
}