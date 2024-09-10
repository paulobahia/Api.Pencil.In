import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Pencil.In API')
    .setDescription(
      'API para gerenciar os agendamentos da plataforma Pencil.In',
    )
    .setVersion('1.0')
    .addTag('endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(5001);
}
bootstrap();
