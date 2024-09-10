import { Service } from "@prisma/client";
import { ServiceEntity } from "../../entities/service.entity";

export class ServiceMapper {
  static toDomain(raw: Service): ServiceEntity {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      durationMinutes: raw.durationMinutes,
      price: raw.price,
      establishmentId: raw.establishmentId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      isDeleted: raw.isDeleted,
      deletedAt: raw.deletedAt
    }
  }
}