import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createEvent(data: Partial<Event>): Promise<Event> {
    const event = this.eventRepository.create(data);
    return this.eventRepository.save(event);
  }

  async getEvents(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['tasks'] });
  }

  async createTask(eventId: number, data: Partial<Task>): Promise<Task> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) throw new Error('Event not found');
    const task = this.taskRepository.create({ ...data, event });
    return this.taskRepository.save(task);
  }

  async getTasks(eventId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { event: { id: eventId } } });
  }

  async updateTask(eventId: number, taskId: number, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId, event: { id: eventId } } });
    if (!task) throw new Error('Task not found');
    Object.assign(task, updateData);
    return this.taskRepository.save(task);
  }

  async deleteEvent(eventId: number): Promise<void> {
    await this.eventRepository.delete(eventId);
  }
}
