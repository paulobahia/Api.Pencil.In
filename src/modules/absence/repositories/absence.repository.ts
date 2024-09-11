import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { AbsenceRepository } from "../interfaces/absence.interface";
import { Absence } from "@prisma/client";
import { CreateAbsenceModel } from "../models/create-absence.model";
import { UpdateAbsenceModel } from "../models/update-absence.model";

@Injectable()
export class AbsenceRepositoryImplement implements AbsenceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(establishmentId: string): Promise<Absence[]> {
    const absences = await this.prisma.absence.findMany({
      where: {
        isDeleted: false,
        employee: {
          establishmentId
        },
      },
    });

    if (!absences) {
      return null;
    }

    return absences
  }

  async findById(id: string, establishmentId: string): Promise<Absence | null> {
    const absence = await this.prisma.absence.findUnique({
      where: {
        id,
        employee: {
          establishmentId
        },
        isDeleted: false,
      },
    });

    if (!absence) {
      return null;
    }

    return absence
  }

  async create(absence: CreateAbsenceModel): Promise<void> {
    const { date, employeeId, reason } = absence;

    await this.prisma.absence.create({
      data: {
        date,
        reason,
        employeeId
      },
    });
  }

  async update(absence: UpdateAbsenceModel): Promise<void> {
    const { id, date, reason } = absence;

    await this.prisma.absence.update({
      where: {
        id
      },
      data: {
        date,
        reason
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.absence.update({
      where: {
        id
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}