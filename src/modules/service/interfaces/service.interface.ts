import { Service } from '@prisma/client';
import { CreateServiceModel } from '../models/create-service.model';
import { UpdateServiceModel } from '../models/update-service.model';

export interface ServiceRepository {
  find(establishmentId: string): Promise<Service[]>;
  findById(id: string, establishmentId: string,): Promise<Service | null>;
  create(service: CreateServiceModel): Promise<void>;
  update(employee: UpdateServiceModel): Promise<void>;
  delete(id: string, establishmentId: string): Promise<void>;
}
