import { User } from '../users/entities/user.entity';

export interface IUserRepository {
  create(user: User): User;
  findAll(): User[];
  findById(id: string): User;
  update(id: string, user: User): User;
  delete(id: string): void;
}
