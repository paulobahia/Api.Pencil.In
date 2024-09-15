import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StudioController } from './controllers/studio.controller';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { StudioRepositoryImplement } from './repositories/studio.repository';
import { FindStudioHandler } from './queries/handlers/find-studio.handler';
import { InjectionToken } from '../injection-token';

const infraestructure: Provider[] = [
  PrismaService,
  {
    provide: InjectionToken.STUDIO_REPOSITORY,
    useClass: StudioRepositoryImplement,
  },
];

const application = [FindStudioHandler];

@Module({
  imports: [CqrsModule],
  controllers: [StudioController],
  providers: [...application, ...infraestructure],
})
export class StudioModule { }
