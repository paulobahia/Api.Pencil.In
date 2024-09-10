import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindEmployeeByIdQuery } from '../implements/find-employee-by-id.query';
import { FindEmployeeByIdResult } from '../implements/find-employee-by-id.result';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';

@QueryHandler(FindEmployeeByIdQuery)
export class FindEmployeeByIdHandler
  implements IQueryHandler<FindEmployeeByIdQuery, FindEmployeeByIdResult>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute({
    id,
    establishmentId,
  }: FindEmployeeByIdQuery): Promise<FindEmployeeByIdResult> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    return await this.employeeRepository.findById(id, establishmentId);
  }
}
