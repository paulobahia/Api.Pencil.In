import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudioModule } from './modules/studio/studio.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ServiceModule } from './modules/service/service.module';
import { AbsenceModule } from './modules/absence/absence.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudioModule,
    EmployeeModule,
    ServiceModule,
    AbsenceModule
  ],
  providers: [],
})
export class AppModule { }
