import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAbsenceCommand } from "../implements/create-absence.command";
import { InjectionToken } from "src/modules/injection-token";
import { Inject } from "@nestjs/common";
import { StudioRepository } from "src/modules/studio/interfaces/studio.interface";
import { AbsenceRepository } from "../../interfaces/absence.interface";
import { CreateAbsenceModel } from "../../models/create-absence.model";
import { EmployeeRepository } from "src/modules/employee/interfaces/employee-repository.interface";
import { NotFoundException } from "src/common/exceptions/not-found.exception";

@CommandHandler(CreateAbsenceCommand)
export class CreateAbsenceHandler implements ICommandHandler<CreateAbsenceCommand, void> {
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;
  @Inject(InjectionToken.ABSENCE_REPOSITORY)
  private readonly absenceRepository: AbsenceRepository;

  async execute(command: CreateAbsenceCommand): Promise<void> {
    const { studioId } = command;

    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const employee = await this.employeeRepository.findById(command.employeeId, studioId)

    if (!employee) {
      throw new NotFoundException('Funcionário');
    }

    const createAbsence = new CreateAbsenceModel(command);

    await this.absenceRepository.create(createAbsence);
  }
}