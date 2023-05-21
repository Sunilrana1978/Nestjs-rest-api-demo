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
  NotFoundException,
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
  async create(@Body() payload: CreateUserDto): Promise<void> {

    const user = plainToClass(CreateUserDto, payload);
    const errors = await validate(user, { skipMissingProperties: true });

    if (errors.length > 0) {
      // Handle validation errors
      throw new Error('Validation failed!');
    }
    await this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: [User],
  })
  @ApiBearerAuth()
  @Get()
  // @UseGuards(AuthGuard('bearer'))
  async findAll(): Promise<User[]>{
    const users = await this.usersService.findAll().then(result => {
      return result;
    });
    console.log (users);
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
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
  async findById(@Param('id') id: string): Promise<User | null> {

    const user = await this.usersService.findById(id).then(result => {
      return result;
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update the User based on UserId',
    type: User,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void>  {
    await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete the User based on UserId',
    type: User,
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void>  {
    await this.usersService.delete(id);
  }
}
