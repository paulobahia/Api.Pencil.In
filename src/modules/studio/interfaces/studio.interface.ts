import { Studio } from '@prisma/client';
import { CreateStudioModel } from '../models/create-studio.model';
import { UpdateStudioModel } from '../models/update-studio.model';

export interface StudioRepository {
  find(): Promise<Studio[]>;
  findById(id: string): Promise<Studio | null>;
  findByEmployeeId(employeeId: string): Promise<Studio[]>;
  create(studio: CreateStudioModel): Promise<void>;
  update(studio: UpdateStudioModel): Promise<void>;
  delete(id: string): Promise<void>;
}
