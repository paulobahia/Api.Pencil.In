import { Absence } from '@prisma/client';
import { CreateAbsenceModel } from '../models/create-absence.model';
import { UpdateAbsenceModel } from '../models/update-absence.model';

export interface AbsenceRepository {
  find(studioId: string): Promise<Absence[]>;
  findById(id: string, studioId: string): Promise<Absence | null>;
  create(absence: CreateAbsenceModel): Promise<void>;
  update(employee: UpdateAbsenceModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}
