import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { UpdateEmployeeDto } from "../dtos/update-employee.dto";
import { FindEmployeeByIdResult } from "../queries/implements/find-employee-by-id.result";
import { FindEmployeeResult } from "../queries/implements/find-employee.result";

export interface EmployeeRepository {
  find(establishmentId: string): Promise<FindEmployeeResult>;
  findById(id: string, establishmentId: string): Promise<FindEmployeeByIdResult | null>
  create(employee: CreateEmployeeDto): Promise<void>
  update(id: string, employee: UpdateEmployeeDto, establishmentId: string): Promise<void>
  delete(id: string, establishmentId: string): Promise<void>
}