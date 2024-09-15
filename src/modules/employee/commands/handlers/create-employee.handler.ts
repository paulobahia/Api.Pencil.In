import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEmployeeCommand } from '../implements/create-employee.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { EmployeeRepository } from '../../interfaces/employee-repository.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { CreateEmployeeModel } from '../../models/create-employee.model';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler implements ICommandHandler<CreateEmployeeCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: CreateEmployeeCommand): Promise<void> {
    const { studioId } = command;

    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const createEmployee = new CreateEmployeeModel(studioId, command);

    await this.employeeRepository.create(createEmployee);
  }
}
