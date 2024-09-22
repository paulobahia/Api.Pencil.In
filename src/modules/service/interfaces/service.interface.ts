import { Service } from '@prisma/client';
import { CreateServiceModel } from '../models/create-service.model';
import { UpdateServiceModel } from '../models/update-service.model';

export interface ServiceRepository {
  find(studioId: string): Promise<Service[]>;
  findById(id: string, studioId: string): Promise<Service | null>;
  findByIds(ids: string[], studioId: string): Promise<string[]>;
  create(service: CreateServiceModel): Promise<void>;
  update(user: UpdateServiceModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}
