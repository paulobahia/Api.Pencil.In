import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EmployeeController } from './controllers/employee.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepositoryImplement } from '../studio/repositories/studio.repository';
import { FindEmployeeHandler } from './queries/handlers/find-employee.handler';
import { EmployeeRepositoryImplement } from './repositories/employee.repository';
import { InjectionToken } from '../injection-token';
import { CreateEmployeeHandler } from './commands/handlers/create-employee.handler';
import { UpdateEmployeeHandler } from './commands/handlers/update-employee.handler';
import { FindEmployeeByIdHandler } from './queries/handlers/find-employee-by-id.handler';
import { DeleteEmployeeHandler } from './commands/handlers/delete-employee.handler';

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepositoryImplement,
  },
];

const application = [
  FindEmployeeHandler,
  CreateEmployeeHandler,
  UpdateEmployeeHandler,
  FindEmployeeByIdHandler,
  DeleteEmployeeHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [EmployeeController],
  providers: [...application, ...infraestructure],
})
export class EmployeeModule {}
