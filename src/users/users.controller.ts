import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@ApiTags('users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: [User] })
  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {

    const user = plainToClass(CreateUserDto, payload);
    const errors = await validate(user, { skipMissingProperties: true });

    if (errors.length > 0) {
      // Handle validation errors
      throw new Error('Validation failed!');
    }

    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: [User],
  })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('bearer'))
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @Get(':id')
  findById(@Param('id') id: string): User {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update the User based on UserId',
    type: User,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): User {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete the User based on UserId',
    type: User,
  })
  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.usersService.delete(id);
  }
}
