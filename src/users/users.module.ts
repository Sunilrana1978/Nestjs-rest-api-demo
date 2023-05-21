import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { InMemoryRepository } from '../db/InMemoryUserRepository';
import { AuthModule } from '../auth/auth.module';
import { DynamoDBUserRepository } from 'src/db/DynamoDBUserRepository';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUserRepository',
      useValue: new DynamoDBUserRepository(),
    },
    UsersService,
  ],
})
export class UsersModule {}
