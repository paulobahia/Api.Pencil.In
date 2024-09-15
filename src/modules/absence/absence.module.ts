import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InjectionToken } from "../injection-token";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { StudioRepositoryImplement } from "../studio/repositories/studio.repository";
import { AbsenceController } from "./controllers/absence.controller";
import { FindAbsenceHandler } from "./queries/handlers/find-absence.handler";
import { AbsenceRepositoryImplement } from "./repositories/absence.repository";
import { CreateAbsenceHandler } from "./commands/handler/create-absence.handler";
import { EmployeeRepositoryImplement } from "../employee/repositories/employee.repository";
import { UpdateAbsenceHandler } from "./commands/handler/update-absence.handler";
import { DeleteAbsenceHandler } from "./commands/handler/delete-absence.handler";
import { FindAbsenceByIdHandler } from "./queries/handlers/find-absence-by-id.handler";

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepositoryImplement
  },
  {
    provide: InjectionToken.ABSENCE_REPOSITORY,
    useClass: AbsenceRepositoryImplement
  }
];

const application = [FindAbsenceHandler, CreateAbsenceHandler, UpdateAbsenceHandler, FindAbsenceByIdHandler, DeleteAbsenceHandler];

@Module({
  imports: [CqrsModule],
  controllers: [AbsenceController],
  providers: [...application, ...infraestructure],
})
export class AbsenceModule { }