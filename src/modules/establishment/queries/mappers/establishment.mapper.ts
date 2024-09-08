import { Establishment } from "@prisma/client";
import { EstablishmentEntity } from "../../entities/establishment.entity";

export class EstablishmentMapper {
  static toDomain(raw: Establishment): EstablishmentEntity {
    return {
      id: raw.id,
      name: raw.name,
      address: raw.address,
      phone: raw.phone,
      description: raw.description,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    }
  }
}