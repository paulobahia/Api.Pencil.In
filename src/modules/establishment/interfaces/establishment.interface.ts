import { Establishment } from '@prisma/client';

export interface EstablishmentRepository {
  find(): Promise<Establishment[]>;
  findById(id: string): Promise<Establishment | null>;
}
