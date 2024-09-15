import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAbsenceCommand } from '../implements/update-absence.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { StudioRepository } from 'src/modules/studio/interfaces/studio.interface';
import { AbsenceRepository } from '../../interfaces/absence.interface';
import { EmployeeRepository } from 'src/modules/employee/interfaces/employee-repository.interface';
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
    const studio = await this.studioRepository.findById(command.studioId,);
    const { studioId } = command;

    if (!studio) {
      throw new NotFoundException();
    }

    const employee = await this.employeeRepository.findById(command.employeeId, studioId)

    if (!employee) {
      throw new NotFoundException();
    }

    const absence = await this.absenceRepository.findById(command.id, studioId);

    if (!absence) {
      throw new NotFoundException();
    }

    const updateAbsence = new UpdateAbsenceModel(command);

    await this.absenceRepository.update(updateAbsence);
  }
}
