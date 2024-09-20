import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { EmployeeRepository } from '../../interfaces/employee.interface';
import { FindEmployeeByUserIdQuery } from '../implements/find-employee-by-userId.query';
import { EmployeeViewModel } from '../../viewmodels/employee.viewmodel';

@QueryHandler(FindEmployeeByUserIdQuery)
export class FindEmployeeByUserIdHandler implements IQueryHandler<FindEmployeeByUserIdQuery> {
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({ userId }: FindEmployeeByUserIdQuery): Promise<EmployeeViewModel | null> {
    const employee = await this.employeeRepository.findByUserId(userId);

    if (!employee) {
      return null
    }

    return new EmployeeViewModel(employee)
  }
}
