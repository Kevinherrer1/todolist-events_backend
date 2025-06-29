import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getTest() {
    return {
      message: '¡Conexión exitosa entre frontend y backend!',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  }

  @Post('events')
  async createEvent(@Body() eventData: any) {
    const event = await this.appService.createEvent(eventData);
    return {
      message: 'Evento creado exitosamente',
      data: event,
      timestamp: new Date().toISOString()
    };
  }

  @Get('events')
  async getEvents() {
    return this.appService.getEvents();
  }

  @Post('events/:eventId/tasks')
  async createTask(@Param('eventId') eventId: number, @Body() taskData: any) {
    const task = await this.appService.createTask(eventId, taskData);
    return {
      message: 'Tarea creada exitosamente',
      data: task,
      timestamp: new Date().toISOString()
    };
  }

  @Get('events/:eventId/tasks')
  async getTasks(@Param('eventId') eventId: number) {
    return this.appService.getTasks(eventId);
  }

  @Patch('events/:eventId/tasks/:taskId')
  async updateTask(
    @Param('eventId') eventId: number,
    @Param('taskId') taskId: number,
    @Body() updateData: any
  ) {
    const task = await this.appService.updateTask(eventId, taskId, updateData);
    return {
      message: 'Tarea actualizada exitosamente',
      data: task,
      timestamp: new Date().toISOString()
    };
  }

  @Delete('events/:eventId')
  async deleteEvent(@Param('eventId') eventId: number) {
    await this.appService.deleteEvent(eventId);
    return { message: 'Evento eliminado exitosamente' };
  }
}
