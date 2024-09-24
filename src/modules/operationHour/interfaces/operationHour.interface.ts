import { OperationHour } from '@prisma/client';
import { CreateOperationHourModel } from '../models/create-operationHour.model';

export interface OperationHourRepository {
  find(studioId: string, employeeId: string): Promise<OperationHour[]>;
  create(operationhour: CreateOperationHourModel): Promise<void>;
}
