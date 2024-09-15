import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEmployeeCommand } from '../implements/delete-employee.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';

@CommandHandler(DeleteEmployeeCommand)
export class DeleteEmployeeHandler implements ICommandHandler<DeleteEmployeeCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: DeleteEmployeeCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { id, studioId } = command;

    if (!studio) {
      throw new NotFoundException();
    }

    const employee = await this.employeeRepository.findById(
      command.id,
      studioId,
    );

    if (!employee) {
      throw new NotFoundException();
    }

    await this.employeeRepository.delete(id, studioId);
  }
}
