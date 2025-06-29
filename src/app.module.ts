import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || '',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || '',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || '',
      entities: [Event, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
