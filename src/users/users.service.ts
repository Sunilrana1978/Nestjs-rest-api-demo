import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private fakeUsersRepo: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    this.fakeUsersRepo.push(user);
    return user;
  }

  findAll(): CreateUserDto[] {
    return this.fakeUsersRepo;
  }

  findOne(id: number): CreateUserDto {
    return this.fakeUsersRepo.find((user) => user.userId === id);
  }

  update(id: number, updateUser: UpdateUserDto) {
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

  remove(id: number) {
    const userRemoved = this.fakeUsersRepo.find((user) => user.userId == id);

    this.fakeUsersRepo = this.fakeUsersRepo.filter(
      (user) => user.userId !== id,
    );

    return { message: 'User deleted', User: userRemoved };
  }
}
