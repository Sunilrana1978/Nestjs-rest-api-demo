import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UUID } from 'crypto';
import { AddressDTO } from '../dto/address.dto';

enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  /**
   * The name of the User
   * @example User
   */
  @ApiProperty({
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    description: 'The User Id',
  })
  userId: UUID;

  @ApiProperty({ example: 'Sunil', description: 'The First Name of the User' })
  firstName: string;

  @ApiProperty({ example: 'Kumar', description: 'The Last Name of the User' })
  lastName: string;

  @ApiProperty({
    example: 'Sunil Kumar',
    description: 'The Full Name of the User',
  })
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty({
    example: 'sunil@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'Admin or user',
    description: 'The email of the user',
  })
  type: UserType;

  @ApiProperty()
  @Type(() => AddressDTO)
  addresses: AddressDTO[];

  @ApiProperty({
    example: '2023-04-23T19:26:04.297Z',
    description: 'Created on date',
  })
  createdAt: string = new Date().toISOString();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
