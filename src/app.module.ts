import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EstablishmentModule } from './modules/establishment/establishment.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EstablishmentModule],
  providers: [],
})
export class AppModule {}
