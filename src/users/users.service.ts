import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { IUserRepository } from 'src/db/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly IUserRepository: IUserRepository,
  ) {}

  create(entity: CreateUserDto): User {
    return this.IUserRepository.create(new User(instanceToPlain(entity)));
  }

  findAll(): User[] {
    return this.IUserRepository.findAll();
  }

  findById(id: string): User {
    return this.IUserRepository.findById(id);
  }

  update(id: string, entity: UpdateUserDto): User {
    return this.IUserRepository.update(id, new User(instanceToPlain(entity)));
  }

  delete(id: string): void {
    this.IUserRepository.delete(id);
  }
}
