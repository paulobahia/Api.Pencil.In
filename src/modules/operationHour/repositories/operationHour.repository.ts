import { Injectable } from "@nestjs/common";
import { OperationHourRepository } from "../interfaces/operationHour.interface";
import { OperationHour } from "@prisma/client";
import { PrismaService } from "src/infrastructure/database/prisma.service";

@Injectable()
export class OperationHourRepositoryImplement implements OperationHourRepository {
  constructor(private readonly prisma: PrismaService) { }

  async find(studioId: string, employeeId: string): Promise<OperationHour[]> {
    const operationHours = await this.prisma.operationHour.findMany({
      where: {
        employee: {
          id: employeeId,
          studioId
        },
        isDeleted: false,
      },
      include: {
        timeIntervals: true
      }
    });

    return operationHours
  }
}