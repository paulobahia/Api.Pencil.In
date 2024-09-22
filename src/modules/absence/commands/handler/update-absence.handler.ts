import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAbsenceCommand } from '../implements/update-absence.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject } from '@nestjs/common';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { AbsenceRepository } from '../../interfaces/absence.interface';
import { EmployeeRepository } from 'src/modules/employee/interfaces/employee.interface';
import { UpdateAbsenceModel } from '../../models/update-absence.model';

@CommandHandler(UpdateAbsenceCommand)
export class UpdateAbsenceHandler
  implements ICommandHandler<UpdateAbsenceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository

  async execute(command: UpdateAbsenceCommand): Promise<void> {
    const studio = await this.studioRepository.findById(command.studioId);
    const { employeeId, studioId } = command;

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const employee = await this.employeeRepository.findById(employeeId, studioId)

    if (!employee) {
      throw new NotFoundException('Funcionário');
    }

    const absence = await this.absenceRepository.findById(command.id, studioId);

    if (!absence) {
      throw new NotFoundException('Ausência');
    }

    const updateAbsence = new UpdateAbsenceModel(command);

    await this.absenceRepository.update(updateAbsence);
  }
}
