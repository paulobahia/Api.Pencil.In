import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { EmployeeRepository } from "../interfaces/employee.interface";
import { Employee } from "@prisma/client";
import { CreateEmployeeModel } from "../models/create-employee.model";
import { UpdateEmployeeModel } from "../models/update-employee.model";

@Injectable()
export class EmployeeRepositoryImplement implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(studioId: string): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany({
      where: {
        isDeleted: false,
        studioId
      },
    });

    return employees
  }

  async findById(id: string, studioId: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
        studioId,
        isDeleted: false,
      },
    });

    if (!employee) {
      return null;
    }

    return employee
  }

  async findByOnlyId(id: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!employee) {
      return null;
    }

    return employee
  }

  async findByUserId(userId: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        userId
      }
    })

    if (!employee) {
      return null
    }

    return employee
  }

  async create(employee: CreateEmployeeModel): Promise<void> {
    const { userId } = employee;

    await this.prisma.employee.create({
      data: { userId },
    });
  }

  async update(employee: UpdateEmployeeModel): Promise<void> {
    const { id, studioId } = employee;

    await this.prisma.employee.update({
      where: { id },
      data: { studioId },
    });
  }

  async delete(id: string, studioId: string): Promise<void> {
    await this.prisma.employee.update({
      where: {
        id,
        studioId
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}