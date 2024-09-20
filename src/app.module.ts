import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudioModule } from './modules/studio/studio.module';
import { UserModule } from './modules/user/user.module';
import { ServiceModule } from './modules/service/service.module';
import { AbsenceModule } from './modules/absence/absence.module';
import { ClientModule } from './modules/client/client.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudioModule,
    UserModule,
    ServiceModule,
    AbsenceModule,
    ClientModule,
    SchedulingModule,
    EmployeeModule
  ],
  providers: [],
})
export class AppModule { }
