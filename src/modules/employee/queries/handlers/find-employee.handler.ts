import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEmployeeQuery } from '../implements/find-employee.query';
import { FindEmployeeResult } from '../implements/find-employee.result';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';

@QueryHandler(FindEmployeeQuery)
export class FindEmployeeHandler
  implements IQueryHandler<FindEmployeeQuery, FindEmployeeResult>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({
    establishmentId,
  }: FindEmployeeQuery): Promise<FindEmployeeResult> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    return await this.employeeRepository.find(establishmentId);
  }
}
