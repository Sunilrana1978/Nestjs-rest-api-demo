import { User } from '../users/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[] | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
