import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EstablishmentController } from "./controllers/establishment.controller";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { EstablishmentRepositoryImplement } from "./repositories/establishment.repository";
import { FindEstablishmentHandler } from "./queries/handlers/find-establishment.handler";
import { InjectionToken } from "../injection-token";

const infraestructure: Provider[] = [
    PrismaService,
    {
        provide: InjectionToken.ESTABLISHMENT_REPOSITORY,
        useClass: EstablishmentRepositoryImplement
    }
]

const application = [FindEstablishmentHandler]

@Module({
    imports: [CqrsModule],
    controllers: [EstablishmentController],
    providers: [...application, ...infraestructure],
})
export class EstablishmentModule { }