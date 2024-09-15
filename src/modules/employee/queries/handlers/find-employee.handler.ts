import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEmployeeQuery } from '../implements/find-employee.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { EmployeeViewModel } from '../../viewmodels/employee.viewmodel';

@QueryHandler(FindEmployeeQuery)
export class FindEmployeeHandler implements IQueryHandler<FindEmployeeQuery, EmployeeViewModel[]> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({ studioId }: FindEmployeeQuery): Promise<EmployeeViewModel[]> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException();
    }

    const employees = await this.employeeRepository.find(studioId);

    return employees.map(employee => new EmployeeViewModel(employee))
  }
}
