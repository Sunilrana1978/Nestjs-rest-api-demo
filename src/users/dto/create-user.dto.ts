import { IsNotEmpty, IsEmail } from 'class-validator';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
// import { v4 as uuidv4 } from 'uuid';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: UUID;

  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
