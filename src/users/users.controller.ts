import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: [User],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update the User based on UserId',
    type: User,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete the User based on UserId',
    type: User,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
