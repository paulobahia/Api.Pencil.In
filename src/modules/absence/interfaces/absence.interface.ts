import { Absence } from '@prisma/client';
import { CreateAbsenceModel } from '../models/create-absence.model';
import { UpdateAbsenceModel } from '../models/update-absence.model';

export interface AbsenceRepository {
  find(establishmentId: string): Promise<Absence[]>;
  findById(id: string, establishmentId: string): Promise<Absence | null>;
  create(service: CreateAbsenceModel): Promise<void>;
  update(employee: UpdateAbsenceModel): Promise<void>;
  delete(id: string): Promise<void>;
}
