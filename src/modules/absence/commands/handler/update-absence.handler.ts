import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAbsenceCommand } from '../implements/update-absence.command';
import { InjectionToken } from 'src/modules/injection-token';
import { Inject, NotFoundException } from '@nestjs/common';
import { EstablishmentRepository } from 'src/modules/establishment/interfaces/establishment.interface';
import { AbsenceRepository } from '../../interfaces/absence.interface';
import { EmployeeRepository } from 'src/modules/employee/interfaces/employee-repository.interface';
import { UpdateAbsenceModel } from '../../models/update-absence.model';

@CommandHandler(UpdateAbsenceCommand)
export class UpdateAbsenceHandler
  implements ICommandHandler<UpdateAbsenceCommand, void> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository

  async execute(command: UpdateAbsenceCommand): Promise<void> {
    const establishment = await this.establishmentRepository.findById(command.establishmentId,);
    const { establishmentId } = command;

    if (!establishment) {
      throw new NotFoundException();
    }

    const employee = await this.employeeRepository.findById(command.employeeId, establishmentId)

    if (!employee) {
      throw new NotFoundException();
    }

    const absence = await this.absenceRepository.findById(command.id, establishmentId);

    if (!absence) {
      throw new NotFoundException();
    }

    const updateAbsence = new UpdateAbsenceModel(command);

    await this.absenceRepository.update(updateAbsence);
  }
}
