import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EstablishmentModule } from './modules/establishment/establishment.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EstablishmentModule, EmployeeModule],
  providers: [],
})
export class AppModule { }
