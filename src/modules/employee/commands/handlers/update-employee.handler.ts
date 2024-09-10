import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEmployeeCommand } from '../implements/update-employee.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectionToken } from 'src/modules/injection-token';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { UpdateEmployeeModel } from '../../models/update-employee.model';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeHandler
  implements ICommandHandler<UpdateEmployeeCommand, void>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: UpdateEmployeeCommand): Promise<void> {
    const establishment = await this.establishmentRepository.findById(
      command.establishmentId,
    );
    const { establishmentId } = command;

    if (!establishment) {
      throw new NotFoundException();
    }

    const employee = await this.employeeRepository.findById(
      command.id,
      establishmentId,
    );

    if (!employee) {
      throw new NotFoundException();
    }

    const updateEmployee = new UpdateEmployeeModel(establishmentId, command);

    await this.employeeRepository.update(updateEmployee);
  }
}
