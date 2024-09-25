import { OperationHour } from '@prisma/client';
import { CreateOperationHourModel } from '../models/create-operationHour.model';
import { UpdateOperationHourModel } from '../models/update-operationHour.model';

export interface OperationHourRepository {
  find(studioId: string, employeeId: string): Promise<OperationHour[]>;
  create(operationHour: CreateOperationHourModel): Promise<void>;
  update(operationHour: UpdateOperationHourModel): Promise<void>;
}
