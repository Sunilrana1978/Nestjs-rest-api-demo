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
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  
  @ApiOperation({ summary: 'Get all User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

 
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({
    status: 200,
    description: 'Get the User based on UserId',
    type: User,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update the User based on UserId',
    type: User,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete the User based on UserId',
    type: User,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
