import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { ServiceController } from "./controllers/service.controller";
import { InjectionToken } from "../injection-token";
import { EstablishmentRepositoryImplement } from "../establishment/repositories/establishment.repository";
import { ServiceRepositoryImplement } from "./repositories/service.repository";
import { FindServiceHandler } from "./queries/handlers/find-service.handler";
import { CreateServiceHandler } from "./commands/handlers/create-service.handler";

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.ESTABLISHMENT_REPOSITORY,
    useClass: EstablishmentRepositoryImplement
  },
  {
    provide: InjectionToken.SERVICE_REPOSITORY,
    useClass: ServiceRepositoryImplement
  },
]

const application = [FindServiceHandler, CreateServiceHandler]

@Module({
  imports: [CqrsModule],
  controllers: [ServiceController],
  providers: [...application, ...infraestructure],
})
export class ServiceModule { }