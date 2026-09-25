import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Especificamos NestExpressApplication para habilitar los métodos de archivos estáticos
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilitar CORS para permitir peticiones desde Angular
  app.enableCors();

  // Servir la carpeta 'uploads' como archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();