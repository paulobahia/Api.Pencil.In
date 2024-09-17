import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { InjectionToken } from "../injection-token";
import { StudioRepositoryImplement } from "../studio/repositories/studio.repository";
import { ClientRepositoryImplement } from "./repositories/client.repository";
import { CreateClientHandler } from "./commands/handlers/create-client.handler";
import { DeleteClientHandler } from "./commands/handlers/delete-client.handler";
import { UpdateClientHandler } from "./commands/handlers/update-client.handler";
import { FindClientByIdHandler } from "./queries/handlers/find-employee-by-id.handler";
import { FindClientHandler } from "./queries/handlers/find-employee.handler";
import { ClientController } from "./controllers/client.controller";

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.CLIENT_REPOSITORY,
    useClass: ClientRepositoryImplement,
  },
];

const application = [
  FindClientHandler,
  CreateClientHandler,
  UpdateClientHandler,
  FindClientByIdHandler,
  DeleteClientHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [ClientController],
  providers: [...application, ...infraestructure],
})
export class ClientModule { }