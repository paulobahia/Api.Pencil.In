import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { UserRepository } from '../interfaces/user-repository.interface';
import { CreateUserModel } from '../models/create-user.model';
import { UpdateUserModel } from '../models/update-user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepositoryImplement implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!user) {
      return null;
    }

    return user
  }

  async find(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });

    return users
  }

  async create(user: CreateUserModel): Promise<void> {
    const { email, name, password, phone } = user;

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        phone
      },
    });
  }

  async update(user: UpdateUserModel) {
    const { id, email, name } = user;

    await this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
