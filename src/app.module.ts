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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'todolist-events',
      entities: [Event, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
