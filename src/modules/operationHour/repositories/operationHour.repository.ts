import { Injectable } from "@nestjs/common";
import { OperationHourRepository } from "../interfaces/operationHour.interface";
import { OperationHour } from "@prisma/client";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { CreateOperationHourModel } from "../models/create-operationHour.model";

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
        timeIntervals: true,
        exceptions: true
      }
    });

    return operationHours
  }

  async create(operationhour: CreateOperationHourModel): Promise<void> {
    const { employeeId, dayOfWeek, isDefault, timeIntervals, exceptions, specificDate } = operationhour

    await this.prisma.$transaction(async (prisma) => {
      const operationHour = await prisma.operationHour.create({
        data: {
          employee: { connect: { id: employeeId } },
          dayOfWeek,
          specificDate,
          isDefault
        }
      });

      const operationHourId = operationHour.id;

      await prisma.timeInterval.createMany({
        data: timeIntervals.map(interval => ({
          operationHourId,
          startTime: interval.startTime,
          endTime: interval.endTime,
        }))
      });

      if (exceptions?.length) {
        const createdExceptions = await Promise.all(exceptions.map(exception =>
          prisma.operationHourException.create({
            data: {
              operationHourId,
              exceptionDate: exception.exceptionDate
            }
          })
        ));

        await Promise.all(createdExceptions.map((createdException, index) =>
          Promise.all(exceptions[index].timeIntervals.map(({ startTime, endTime }) =>
            prisma.timeInterval.create({
              data: {
                operationHourId,
                operationHourExceptionId: createdException.id,
                startTime,
                endTime
              }
            })
          ))
        ));
      }
    })
  }
}