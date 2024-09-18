import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ClientRepository } from '../interfaces/client-repository.interface';
import { CreateClientModel } from '../models/create-client.model';
import { UpdateClientModel } from '../models/update-client.model';
import { Client } from '@prisma/client';

@Injectable()
export class ClientRepositoryImplement implements ClientRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findById(id: string, studioId: string): Promise<Client | null> {
    const client = await this.prisma.client.findUnique({
      where: {
        id,
        studioId,
        isDeleted: false,
      },
    });

    if (!client) {
      return null;
    }

    return client
  }

  async find(studioId: string): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      where: {
        studioId,
        isDeleted: false,
      },
    });

    return clients
  }

  async create(client: CreateClientModel): Promise<void> {
    const { name, phone, studioId } = client;

    await this.prisma.client.create({
      data: {
        name,
        phone,
        studioId,
      },
    });
  }

  async update(client: UpdateClientModel) {
    const { id, name, phone, studioId } = client;

    await this.prisma.client.update({
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
    await this.prisma.client.update({
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
