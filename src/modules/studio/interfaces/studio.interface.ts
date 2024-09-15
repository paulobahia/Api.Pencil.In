import { Studio } from '@prisma/client';

export interface StudioRepository {
  find(): Promise<Studio[]>;
  findById(id: string): Promise<Studio | null>;
}
