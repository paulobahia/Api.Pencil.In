import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { EmployeeRepository } from '../interfaces/employee-repository.interface';
import { CreateEmployeeModel } from '../models/create-employee.model';
import { UpdateEmployeeModel } from '../models/update-employee.model';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeRepositoryImplement implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) { }

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

  async find(studioId: string): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany({
      where: {
        studioId,
        isDeleted: false,
      },
    });

    return employees
  }

  async create(employee: CreateEmployeeModel): Promise<void> {
    const { email, name, password, studioId } = employee;

    await this.prisma.employee.create({
      data: {
        name,
        email,
        password,
        studioId,
      },
    });
  }

  async update(employee: UpdateEmployeeModel) {
    const { id, email, name, studioId } = employee;

    await this.prisma.employee.update({
      where: {
        id,
        studioId,
      },
      data: {
        name,
        email,
      },
    });
  }

  async delete(id: string, studioId: string) {
    await this.prisma.employee.update({
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
