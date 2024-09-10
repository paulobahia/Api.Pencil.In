import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { FindEmployeeResult } from "../queries/implements/find-employee.result";
import { EmployeeMapper } from "../queries/mappers/employee.mapper";
import { EmployeeRepository } from "../interfaces/employee-repository.interface";
import { FindEmployeeByIdResult } from "../queries/implements/find-employee-by-id.result";
import { CreateEmployeeRequestDto } from "../dtos/create-employee-request.dto";
import { UpdateEmployeeRequestDto } from "../dtos/update-employee-request-param.dto";
import { CreateEmployeeModel } from "../models/create-employee.model";
import { UpdateEmployeeModel } from "../models/update-employee.model";

@Injectable()
export class EmployeeRepositoryImplement implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string, establishmentId: string): Promise<FindEmployeeByIdResult | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
        establishmentId,
        isDeleted: false
      }
    });

    if (!employee) {
      return null
    }

    return { employee: EmployeeMapper.toDomain(employee) };
  }

  async find(establishmentId: string): Promise<FindEmployeeResult> {
    const employees = await this.prisma.employee.findMany({
      where: {
        establishmentId,
        isDeleted: false
      }
    });

    return { employees: employees.map(EmployeeMapper.toDomain) };
  }

  async create(employee: CreateEmployeeModel): Promise<void> {
    const { email, name, password, establishmentId } = employee

    await this.prisma.employee.create({
      data: {
        name,
        email,
        password,
        establishmentId
      }
    })
  }

  async update(employee: UpdateEmployeeModel) {
    const { id, email, name, establishmentId } = employee

    await this.prisma.employee.update({
      where: {
        id,
        establishmentId
      },
      data: {
        name,
        email
      }
    })
  }

  async delete(id: string, establishmentId: string) {

    await this.prisma.employee.update({
      where: {
        id,
        establishmentId
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })
  }
}