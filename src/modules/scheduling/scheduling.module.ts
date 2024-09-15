import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { InjectionToken } from "../injection-token";
import { StudioRepositoryImplement } from "../studio/repositories/studio.repository";
import { SchedulingRepositoryImplement } from "./repositories/scheduling.repository";
import { CreateSchedulingHandler } from "./commands/handlers/create-scheduling.handler";
import { DeleteSchedulingHandler } from "./commands/handlers/delete-scheduling.handler";
import { UpdateSchedulingHandler } from "./commands/handlers/update-scheduling.handler";
import { FindSchedulingByIdHandler } from "./queries/handlers/find-scheduling-by-id.handler";
import { FindSchedulingHandler } from "./queries/handlers/find-scheduling.handler";
import { SchedulingController } from "./controllers/scheduling.controller";
import { UserRepositoryImplement } from "../user/repositories/user.repository";
import { ServiceRepositoryImplement } from "../service/repositories/service.repository";

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.SCHEDULING_REPOSITORY,
    useClass: SchedulingRepositoryImplement,
  },
  {
    provide: InjectionToken.SERVICE_REPOSITORY,
    useClass: ServiceRepositoryImplement,
  },
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

const application = [
  FindSchedulingHandler,
  CreateSchedulingHandler,
  UpdateSchedulingHandler,
  FindSchedulingByIdHandler,
  DeleteSchedulingHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [SchedulingController],
  providers: [...application, ...infraestructure],
})
export class SchedulingModule { }