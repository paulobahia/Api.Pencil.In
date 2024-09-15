import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEmployeeByIdQuery } from '../implements/find-employee-by-id.query';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { EmployeeViewModel } from '../../viewmodels/employee.viewmodel';

@QueryHandler(FindEmployeeByIdQuery)
export class FindEmployeeByIdHandler implements IQueryHandler<FindEmployeeByIdQuery, EmployeeViewModel> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({ id, studioId }: FindEmployeeByIdQuery): Promise<EmployeeViewModel> {
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const employee = await this.employeeRepository.findById(id, studioId);

    return new EmployeeViewModel(employee)
  }
}
