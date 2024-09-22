import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StudioController } from './controllers/studio.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepositoryImplement } from './repositories/studio.repository';
import { FindStudioHandler } from './queries/handlers/find-studio.handler';
import { InjectionToken } from '../injection-token';
import { FindStudioByEmployeeIdHandler } from './queries/handlers/find-studio-by-employeeId.handler';
import { EmployeeRepositoryImplement } from '../employee/repositories/employee.repository';
import { FindStudioByIdHandler } from './queries/handlers/find-studio-by-id.handler';
import { CreateStudioHandler } from './commands/handlers/create-studio.handler';
import { UpdateStudioHandler } from './commands/handlers/update-studio.handler';
import { DeleteStudioHandler } from './commands/handlers/delete-studio.handler';

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

const application = [FindStudioHandler, FindStudioByIdHandler, FindStudioByEmployeeIdHandler, CreateStudioHandler, UpdateStudioHandler, DeleteStudioHandler];

@Module({
  imports: [CqrsModule],
  controllers: [StudioController],
  providers: [...application, ...infraestructure],
})
export class StudioModule { }
