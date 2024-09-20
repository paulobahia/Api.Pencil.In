import { Employee } from "@prisma/client";
import { CreateEmployeeModel } from "../models/create-employee.model";
import { UpdateEmployeeModel } from "../models/update-employee.model";

export interface EmployeeRepository {
  find(studioId: string): Promise<Employee[]>;
  findById(id: string, studioId: string,): Promise<Employee | null>;
  findByUserId(userId: string): Promise<Employee | null>
  create(employee: CreateEmployeeModel): Promise<void>;
  update(employee: UpdateEmployeeModel): Promise<void>;
  delete(id: string, studioId: string): Promise<void>;
}