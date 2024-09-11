import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAbsenceCommand } from "../implements/create-absence.command";
import { InjectionToken } from "src/modules/injection-token";
import { Inject, NotFoundException } from "@nestjs/common";
import { EstablishmentRepository } from "src/modules/establishment/interfaces/establishment.interface";
import { AbsenceRepository } from "../../interfaces/absence.interface";
import { CreateAbsenceModel } from "../../models/create-absence.model";
import { EmployeeRepository } from "src/modules/employee/interfaces/employee-repository.interface";

@CommandHandler(CreateAbsenceCommand)
export class CreateAbsenceHandler implements ICommandHandler<CreateAbsenceCommand, void> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;

  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute(command: CreateAbsenceCommand): Promise<void> {
    const { establishmentId } = command;

    const establishment = await this.establishmentRepository.findById(establishmentId);

    if (!establishment) {
      throw new NotFoundException();
    }

    const employee = await this.employeeRepository.findById(command.employeeId, establishmentId)

    if (!employee) {
      throw new NotFoundException();
    }

    const createAbsence = new CreateAbsenceModel(command);

    await this.absenceRepository.create(createAbsence);
  }
}