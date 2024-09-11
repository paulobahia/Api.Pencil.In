import { Employee } from '@prisma/client';
import { CreateEmployeeModel } from '../models/create-employee.model';
import { UpdateEmployeeModel } from '../models/update-employee.model';

export interface EmployeeRepository {
  find(establishmentId: string): Promise<Employee[]>;
  findById(id: string,establishmentId: string,): Promise<Employee | null>;
  create(employee: CreateEmployeeModel): Promise<void>;
  update(employee: UpdateEmployeeModel): Promise<void>;
  delete(id: string, establishmentId: string): Promise<void>;
}
