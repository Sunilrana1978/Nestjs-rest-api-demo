// import { IsNotEmpty, IsEmail } from 'class-validator';
import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
// import { v4 as uuidv4 } from 'uuid';

// export class CreateUserDto extends BaseDto {
//   @ApiProperty()
//   @IsNotEmpty()
//   readonly userId: UUID;

//   @ApiProperty()
//   @IsNotEmpty()
//   readonly firstName: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   readonly lastName: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   @IsEmail()
//   readonly email: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   readonly password: string;
// }

import {
  IsString,
  ValidateNested,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDTO } from './address.dto';

enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly userId: UUID;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses: AddressDTO[];
}
