import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  private fakeUsersRepo: User[] = [];

  create(user: CreateUserDto): User {
    console.log(instanceToPlain(user))
    console.log(new User(instanceToPlain(user)))

    const _user= new User(instanceToPlain(user))

    this.fakeUsersRepo.push(_user);
    return _user;
  }

  findAll(): User[] {
    return this.fakeUsersRepo;
  }

  findOne(id: number): User {
    const user= this.fakeUsersRepo.find((user) => user.userId === id)
    return  user;
  }

  update(id: number, updateUser: UpdateUserDto): User {
    // Find the index of the item to update
    const indexToUpdate = this.fakeUsersRepo.findIndex(
      (user) => user.userId === id,
    );

    if (indexToUpdate !== -1) {
      // Update the item at the found index
      this.fakeUsersRepo[indexToUpdate] = new User(instanceToPlain(updateUser));

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
