import { OperationHour } from '@prisma/client';
// import { CreateOperationHourModel } from '../models/create-operationhour.model';
// import { UpdateOperationHourModel } from '../models/update-operationhour.model';

export interface OperationHourRepository {
  find(studioId: string, employeeId: string): Promise<OperationHour[]>;
  // findById(id: string, studioId: string): Promise<OperationHour | null>;
  // findByIds(ids: string[], studioId: string): Promise<string[]>;
  // create(operationhour: CreateOperationHourModel): Promise<void>;
  // update(user: UpdateOperationHourModel): Promise<void>;
  // delete(id: string, studioId: string): Promise<void>;
}
