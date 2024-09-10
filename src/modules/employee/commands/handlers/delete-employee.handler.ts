import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEmployeeCommand } from '../implements/delete-employee.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeHandler
  implements ICommandHandler<DeleteEmployeeCommand, void>
{
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: DeleteEmployeeCommand): Promise<void> {
    const establishment = await this.establishmentRepository.findById(
      command.establishmentId,
    );
    const { id, establishmentId } = command;

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

    await this.employeeRepository.delete(id, establishmentId);
  }
}
