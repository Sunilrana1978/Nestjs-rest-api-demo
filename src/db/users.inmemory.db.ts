import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { IUserRepository } from './user.repository';

@Injectable()
export class InMemoryRepository implements IUserRepository {
  private readonly data: Map<string, User>; // data storage in a Map object

  constructor() {
    this.data = new Map<string, User>();
  }

  create(item: User): User {
    this.data.set(item.userId, item);
    return item;
  }

  findAll(): User[] {
    return [...this.data.values()];
  }

  findById(id: string): User {
    return this.data.get(id);
  }

  update(id: string, item: User): User {
    this.data.set(id, item);
    return item;
  }

  delete(id: string): void {
    this.data.delete(id);
  }
}
