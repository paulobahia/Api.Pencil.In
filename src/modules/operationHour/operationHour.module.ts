import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepositoryImplement } from '../studio/repositories/studio.repository';
import { InjectionToken } from '../injection-token';
import { OperationHourController } from './controllers/operationHour.controller';
import { FindOperationHourHandler } from './queries/handlers/find-operationHour.query';
import { OperationHourRepositoryImplement } from './repositories/operationHour.repository';
import { EmployeeRepositoryImplement } from '../employee/repositories/employee.repository';

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.OPERATIONHOUR_REPOSITORY,
    useClass: OperationHourRepositoryImplement,
  },
  {
    provide: InjectionToken.EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepositoryImplement,
  }
];

const application = [FindOperationHourHandler];

@Module({
  imports: [CqrsModule],
  controllers: [OperationHourController],
  providers: [...application, ...infraestructure],
})
export class OperationHourModule { }
