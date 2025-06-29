import { Controller, Get, Post, Body, Param, Patch, Delete, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(@Res() res: Response) {
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>API NestJS</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          h1 {
            color: #28a745;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <h1>🚀 API corriendo correctamente</h1>
        <p>El backend NestJS está activo y funcionando.</p>
      </body>
      </html>
    `);
  }

  @Get('api/saludo')
  getSaludo(): { message: string } {
    return { message: 'Hola desde el backend!' };
  }

  @Get('/')
  getWelcome() {
    return { message: '¡Bienvenido a la API de Eventify! 🚀' };
  }

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
