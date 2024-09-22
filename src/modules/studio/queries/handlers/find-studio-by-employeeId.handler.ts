import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { StudioViewModel } from '../../viewmodels/studio.viewmodel';
import { FindStudioByEmployeeIdQuery } from '../implements/find-studio-by-employeeId.query';
import { EmployeeRepository } from 'src/modules/employee/interfaces/employee.interface';

@QueryHandler(FindStudioByEmployeeIdQuery)
export class FindStudioByEmployeeIdHandler implements IQueryHandler<FindStudioByEmployeeIdQuery, StudioViewModel[]> {
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute({ employeeId }: FindStudioByEmployeeIdQuery): Promise<StudioViewModel[]> {
    const employee = await this.employeeRepository.findByOnlyId(employeeId)

    if (!employee) {
      throw new NotFoundException('Funcionário');
    }

    const studio = await this.studioRepository.findByEmployeeId(employeeId);
    return studio.map(studio => new StudioViewModel(studio))
  }
}
