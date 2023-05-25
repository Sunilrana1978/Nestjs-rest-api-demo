import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  // ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  async findAll(): Promise<User[] | null> {
    return await this.usersService.findAll();
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
    return await this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update the User based on UserId',
    type: User,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.usersService.update(id, updateUserDto).then((result) => {
      return result;
    });
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete the User based on UserId',
    type: User,
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.usersService.delete(id).then((result) => {
      return result;
    });
  }
}
