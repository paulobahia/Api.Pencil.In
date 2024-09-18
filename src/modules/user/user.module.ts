import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './controllers/user.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepositoryImplement } from '../studio/repositories/studio.repository';
import { FindUserHandler } from './queries/handlers/find-user.handler';
import { UserRepositoryImplement } from './repositories/user.repository';
import { InjectionToken } from '../injection-token';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { FindUserByIdHandler } from './queries/handlers/find-user-by-id.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';

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
export class UserModule {}
