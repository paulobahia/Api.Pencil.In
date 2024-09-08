import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateEmployeeCommand } from "../implements/create-employee.command";
import { InjectionToken } from "src/modules/injection-token"
import { Inject, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "../../interfaces/employee-repository.interface";
import { EstablishmentRepository } from "src/modules/establishment/interfaces/establishment.interface";

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler implements ICommandHandler<CreateEmployeeCommand, void> {
  @Inject(InjectionToken.ESTABLISHMENT_REPOSITORY)
  private readonly establishmentRepository: EstablishmentRepository
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository

  async execute(command: CreateEmployeeCommand): Promise<void> {
    const establishment = await this.establishmentRepository.findById(command.establishmentId)

    if (!establishment) {
      throw new NotFoundException()
    }

    await this.employeeRepository.create(command)
  }
}