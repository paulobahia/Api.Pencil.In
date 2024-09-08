import { Establishment } from "@prisma/client";
import { EstablishmentEntity } from "../../entities/establishment.entity";
import { EstablishmentModel } from "../../dtos/establishment.model";

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

  static toModel(entity: Establishment): EstablishmentModel {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address,
      phone: entity.phone,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      isDeleted: entity.isDeleted,
      deletedAt: entity.deletedAt,
    };
  }
}