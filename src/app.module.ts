import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ServiceModule } from './modules/service/service.module';
import { AbsenceModule } from './modules/absence/absence.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EstablishmentModule,
    EmployeeModule,
    ServiceModule,
    AbsenceModule
  ],
  providers: [],
})
export class AppModule { }
