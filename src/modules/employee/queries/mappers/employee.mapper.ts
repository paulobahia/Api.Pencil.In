import { Employee } from "@prisma/client";
import { EmployeeEntity } from "../../entities/employee.entity";

export class EmployeeMapper {
  static toDomain(raw: Employee): EmployeeEntity {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt
    }
  }
}