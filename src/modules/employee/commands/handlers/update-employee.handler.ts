import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateEmployeeCommand } from '../implements/update-employee.command';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { InjectionToken } from 'src/modules/injection-token';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { UpdateEmployeeModel } from '../../models/update-employee.model';

@CommandHandler(UpdateEmployeeCommand)
export class UpdateEmployeeHandler implements ICommandHandler<UpdateEmployeeCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: UpdateEmployeeCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const employee = await this.employeeRepository.findById(
      command.id,
      studioId,
    );

    if (!employee) {
      throw new NotFoundException('Funcionário');
    }

    const updateEmployee = new UpdateEmployeeModel(studioId, command);

    await this.employeeRepository.update(updateEmployee);
  }
}
