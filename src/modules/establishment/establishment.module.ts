import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EstablishmentController } from "./controllers/establishment.controller";
import { PrismaService } from "src/infrastructure/database/prisma.service";
import { InjectionToken } from "./injection-token";
import { EstablishmentQueryImplement } from "./queries/implements/establishment.implement";
import { FindEstablishmentHandler } from "./queries/handlers/find-establishment.handle";

const infraestructure: Provider[] = [
    PrismaService,
    {
        provide: InjectionToken.ESTABLISHMENT_QUERY,
        useClass: EstablishmentQueryImplement
    }
]

const application = [FindEstablishmentHandler]

@Module({
    imports: [CqrsModule],
    controllers: [EstablishmentController],
    providers: [...application, ...infraestructure],
})
export class EstablishmentModule { }