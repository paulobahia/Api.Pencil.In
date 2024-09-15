import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRepository } from '../interfaces/user-repository.interface';
import { CreateUserModel } from '../models/create-user.model';
import { UpdateUserModel } from '../models/update-user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepositoryImplement implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string, studioId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        studioId,
        isDeleted: false,
      },
    });

    if (!user) {
      return null;
    }

    return user
  }

  async find(studioId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        studioId,
        isDeleted: false,
      },
    });

    return users
  }

  async create(user: CreateUserModel): Promise<void> {
    const { name, phone, studioId } = user;

    await this.prisma.user.create({
      data: {
        name,
        phone,
        studioId,
      },
    });
  }

  async update(user: UpdateUserModel) {
    const { id, name, phone, studioId } = user;

    await this.prisma.user.update({
      where: {
        id,
        studioId,
      },
      data: {
        name,
        phone,
      },
    });
  }

  async delete(id: string, studioId: string) {
    await this.prisma.user.update({
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
