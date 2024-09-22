import { Scheduling } from '@prisma/client';
import { CreateSchedulingModel } from '../models/create-scheduling.model';
import { UpdateSchedulingModel } from '../models/update-scheduling.model';

export interface SchedulingRepository {
  find(studioId: string): Promise<Scheduling[]>;
  findById(id: string, studioId: string): Promise<Scheduling | null>;
  create(scheduling: CreateSchedulingModel): Promise<void>;
  update(scheduling: UpdateSchedulingModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}
