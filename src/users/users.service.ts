import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private fakeUsersRepo: User[] = [];

  create(user: CreateUserDto): User {
    this.fakeUsersRepo.push(user);
    return user;
  }

  findAll(): User[] {
    return this.fakeUsersRepo;
  }

  findOne(id: number): User {
    return this.fakeUsersRepo.find((user) => user.userId === id);
  }

  update(id: number, updateUser: UpdateUserDto): User {
    // Find the index of the item to update
    const indexToUpdate = this.fakeUsersRepo.findIndex(
      (user) => user.userId === id,
    );

    if (indexToUpdate !== -1) {
      // Update the item at the found index
      this.fakeUsersRepo[indexToUpdate] = updateUser;

      return this.fakeUsersRepo[indexToUpdate];
    }
  }

  remove(id: number): User {
    const userRemoved = this.fakeUsersRepo.find((user) => user.userId == id);

    this.fakeUsersRepo = this.fakeUsersRepo.filter(
      (user) => user.userId !== id,
    );

    return userRemoved;
  }
}
