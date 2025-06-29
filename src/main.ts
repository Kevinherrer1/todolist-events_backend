import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para permitir peticiones del frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // URLs del frontend con Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Backend running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
