import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { AbsenceRepository } from "../interfaces/absence.interface";
import { Absence } from "@prisma/client";
import { CreateAbsenceModel } from "../models/create-absence.model";
import { UpdateAbsenceModel } from "../models/update-absence.model";

@Injectable()
export class AbsenceRepositoryImplement implements AbsenceRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(studioId: string): Promise<Absence[]> {
    const absences = await this.prisma.absence.findMany({
      where: {
        isDeleted: false,
        employee: {
          studioId
        },
      },
    });

    if (!absences) {
      return null;
    }

    return absences
  }

  async findById(id: string, studioId: string): Promise<Absence | null> {
    const absence = await this.prisma.absence.findUnique({
      where: {
        id,
        employee: {
          studioId
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

  async delete(id: string, studioId: string): Promise<void> {
    await this.prisma.absence.update({
      where: {
        id,
        employee: {
          studioId
        }
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}