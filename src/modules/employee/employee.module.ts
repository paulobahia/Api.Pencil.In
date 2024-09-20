import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { InjectionToken } from "../injection-token";
import { StudioRepositoryImplement } from "../studio/repositories/studio.repository";
import { EmployeeRepositoryImplement } from "./repositories/employee.repository";
import { EmployeeController } from "./controllers/employee.controller";
import { FindEmployeeByUserIdHandler } from "./queries/handlers/find-employee-by-userId.handler";

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

const application = [FindEmployeeByUserIdHandler];

@Module({
  imports: [CqrsModule],
  controllers: [EmployeeController],
  providers: [...application, ...infraestructure],
})
export class EmployeeModule { }