import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from '../implements/create-employee.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { CreateEmployeeModel } from '../../models/create-employee.model';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand, void>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: CreateEmployeeCommand): Promise<void> {
    const { establishmentId } = command;

    const establishment =
      await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const createEmployee = new CreateEmployeeModel(establishmentId, command);

    await this.employeeRepository.create(createEmployee);
  }
}
