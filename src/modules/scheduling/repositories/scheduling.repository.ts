import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { SchedulingRepository } from '../interfaces/scheduling-repository.interface';
import { CreateSchedulingModel } from '../models/create-scheduling.model';
import { UpdateSchedulingModel } from '../models/update-scheduling.model';
import { Scheduling } from '@prisma/client';

@Injectable()
export class SchedulingRepositoryImplement implements SchedulingRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string, studioId: string): Promise<Scheduling | null> {
    const scheduling = await this.prisma.scheduling.findUnique({
      where: {
        id,
        user: { studioId },
        isDeleted: false,
      },
      include: { user: true }
    });

    if (!scheduling) {
      return null;
    }

    return scheduling
  }

  async find(studioId: string): Promise<Scheduling[]> {
    const schedulings = await this.prisma.scheduling.findMany({
      where: {
        user: { studioId },
        isDeleted: false,
      },
      include: { user: true }
    });

    return schedulings
  }

  async create(scheduling: CreateSchedulingModel): Promise<void> {
    const { userId, servicesIds, schedulingTime, notes, status } = scheduling;

    await this.prisma.scheduling.create({
      data: {
        user: { connect: { id: userId } },
        schedulingTime,
        status,
        notes,
        SchedulingService: {
          create: servicesIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId }
            }
          }))
        }
      },
    });
  }

  async update(scheduling: UpdateSchedulingModel) {
    const { id, servicesIds, schedulingTime, notes, status } = scheduling;

    await this.prisma.scheduling.update({
      where: {
        id,
      },
      data: {
        schedulingTime,
        notes,
        status,
        SchedulingService: {
          deleteMany: {},
          create: servicesIds.map((serviceId) => ({
            service: {
              connect: { id: serviceId }
            }
          }))
        }
      },
    });
  }

  async delete(id: string) {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.schedulingService.deleteMany({
        where: { schedulingId: id }
      })

      await this.prisma.scheduling.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
        }
      });
    })
  }
}
