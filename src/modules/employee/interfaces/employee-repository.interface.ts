import { CreateEmployeeModel } from '../models/create-employee.model';
import { UpdateEmployeeModel } from '../models/update-employee.model';
import { FindEmployeeByIdResult } from '../queries/implements/find-employee-by-id.result';
import { FindEmployeeResult } from '../queries/implements/find-employee.result';

export interface EmployeeRepository {
  find(establishmentId: string): Promise<FindEmployeeResult>;
  findById(
    id: string,
    establishmentId: string,
  ): Promise<FindEmployeeByIdResult | null>;
  create(employee: CreateEmployeeModel): Promise<void>;
  update(employee: UpdateEmployeeModel): Promise<void>;
  delete(id: string, establishmentId: string): Promise<void>;
}
