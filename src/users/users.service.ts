import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { UserRepository } from 'src/db/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: UserRepository,
  ) {}

  create(entity: CreateUserDto): User {
    return this.userRepository.create(new User(instanceToPlain(entity)));
  }

  findAll(): User[] {
    return this.userRepository.findAll();
  }

  findById(id: string): User {
    return this.userRepository.findById(id);
  }

  update(id: string, entity: UpdateUserDto): User {
    return this.userRepository.update(id, new User(instanceToPlain(entity)));
  }

  delete(id: string): void {
    this.userRepository.delete(id);
  }
}
