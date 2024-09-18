import { Client } from '@prisma/client';
import { CreateClientModel } from '../models/create-client.model';
import { UpdateClientModel } from '../models/update-client.model';

export interface ClientRepository {
  find(studioId: string): Promise<Client[]>;
  findById(id: string,studioId: string,): Promise<Client | null>;
  create(client: CreateClientModel): Promise<void>;
  update(client: UpdateClientModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}
