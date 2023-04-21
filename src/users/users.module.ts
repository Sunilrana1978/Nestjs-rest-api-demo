import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryRepository } from '../db/users.inmemory.db';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'userRepository',
      useValue: new InMemoryRepository(),
    },
    UsersService,
  ],
})
export class UsersModule {}
