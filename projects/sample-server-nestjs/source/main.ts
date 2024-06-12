import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api'); // Global prefix
  await app.listen(process.env.PORT || 3080);
}

bootstrap();
