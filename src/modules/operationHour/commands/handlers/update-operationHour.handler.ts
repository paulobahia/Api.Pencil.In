import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OperationHourRepository } from '../../interfaces/operationHour.interface';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { UpdateOperationHourCommand } from '../implements/update-operationHour.command';
import { UpdateOperationHourModel } from '../../models/update-operationHour.model';
import { EmployeeRepository } from 'src/modules/employee/interfaces/employee.interface';

@CommandHandler(UpdateOperationHourCommand)
export class UpdateOperationHourHandler implements ICommandHandler<UpdateOperationHourCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.OPERATIONHOUR_REPOSITORY)
  private readonly operationHourRepository: OperationHourRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  async execute(command: UpdateOperationHourCommand): Promise<void> {
    const { studioId, employeeId } = command;
    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const employee = await this.employeeRepository.findById(employeeId, studioId)

    if (!employee) {
      throw new NotFoundException('Fúncionario');
    }

    const updateOperationHour = new UpdateOperationHourModel(studioId, employeeId, command);

    await this.operationHourRepository.update(updateOperationHour)
  }
}
