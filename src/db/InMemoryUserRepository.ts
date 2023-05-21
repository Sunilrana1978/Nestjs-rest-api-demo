import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class InMemoryRepository implements IUserRepository {
  private readonly data: Map<string, User>; // data storage in a Map object

  constructor() {
    this.data = new Map<string, User>();
  }

  async create(item: User): Promise<void> {
    this.data.set(item.userId, item);
  }

  async findAll(): Promise<User[] | null> {

    const users = [...this.data.values()]
    return users.length > 0 ? users : null;
  }

  async findById(id: string): Promise<User | null> {
    return this.data.get(id);
  }

  async update(id: string, item: User): Promise<void>  {
    this.data.set(id, item);
  }

  async delete(id: string): Promise<void> {
    this.data.delete(id);
  }
}
