import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindOperationHourQuery } from "../implements/find-operationHour.query";
import { OperationHourViewModel } from "../../viewmodels/operationHour.viewmodel";
import { InjectionToken } from "src/modules/injection-token";
import { Inject, NotFoundException } from "@nestjs/common";
import { StudioRepository } from "src/modules/studio/interfaces/studio.interface";
import { OperationHourRepository } from "../../interfaces/operationHour.interface";
import { EmployeeRepository } from "src/modules/employee/interfaces/employee.interface";

@QueryHandler(FindOperationHourQuery)
export class FindOperationHourHandler implements IQueryHandler<FindOperationHourQuery, OperationHourViewModel[]> {
  @Inject(InjectionToken.OPERATIONHOUR_REPOSITORY)
  private readonly operationHourRepository: OperationHourRepository;
  @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
  private readonly employeeRepository: EmployeeRepository;
  @Inject(InjectionToken.STUDIO_REPOSITORY)
  private readonly studioRepository: StudioRepository;

  async execute({ studioId, employeeId }: FindOperationHourQuery): Promise<OperationHourViewModel[]> {
    const employee = await this.employeeRepository.findById(employeeId, studioId)

    if (!employee) {
      throw new NotFoundException('Funcionário');
    }

    const studio = await this.studioRepository.findById(studioId);

    if (!studio) {
      throw new NotFoundException('Estúdio');
    }

    const operationHours = await this.operationHourRepository.find(studioId, employeeId)

    return operationHours.map(operationHour => new OperationHourViewModel(operationHour))
  }
}