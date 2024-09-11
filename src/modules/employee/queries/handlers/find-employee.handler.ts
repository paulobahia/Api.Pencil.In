import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEmployeeQuery } from '../implements/find-employee.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { EmployeeViewModel } from '../../viewmodels/employee.viewmodel';

@QueryHandler(FindEmployeeQuery)
export class FindEmployeeHandler
  implements IQueryHandler<FindEmployeeQuery, EmployeeViewModel[]> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({ establishmentId }: FindEmployeeQuery): Promise<EmployeeViewModel[]> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const employees = await this.employeeRepository.find(establishmentId);

    return employees.map(employee => new EmployeeViewModel(employee))
  }
}
