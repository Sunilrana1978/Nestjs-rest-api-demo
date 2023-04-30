import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryRepository } from '../db/users.inmemory.db';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUserRepository',
      useValue: new InMemoryRepository(),
    },
    UsersService,
  ],
})
export class UsersModule {}
