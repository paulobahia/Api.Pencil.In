import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { InjectionToken } from "../injection-token";
import { StudioRepositoryImplement } from "../studio/repositories/studio.repository";
import { UserRepositoryImplement } from "./repositories/user.repository";
import { CreateUserHandler } from "./commands/handlers/create-user.handler";
import { DeleteUserHandler } from "./commands/handlers/delete-user.handler";
import { UpdateUserHandler } from "./commands/handlers/update-user.handler";
import { FindUserByIdHandler } from "./queries/handlers/find-employee-by-id.handler";
import { FindUserHandler } from "./queries/handlers/find-employee.handler";
import { UserController } from "./controllers/user.controller";

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

const application = [
  FindUserHandler,
  CreateUserHandler,
  UpdateUserHandler,
  FindUserByIdHandler,
  DeleteUserHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [...application, ...infraestructure],
})
export class UserModule { }