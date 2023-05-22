import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { IUserRepository } from 'src/db/IUserRepository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly IUserRepository: IUserRepository,
  ) {}

  async create(entity: CreateUserDto): Promise<void> {
    this.IUserRepository.create(new User(instanceToPlain(entity)));
  }

  async findAll(): Promise<User[] | null> {
    return this.IUserRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.IUserRepository.findById(id);
  }

  async update(id: string, entity: UpdateUserDto): Promise<void> {
    this.IUserRepository.update(id, new User(instanceToPlain(entity)));
  }

  async delete(id: string): Promise<void> {
    this.IUserRepository.delete(id);
  }
}
