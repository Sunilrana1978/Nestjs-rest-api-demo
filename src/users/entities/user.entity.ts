import { ApiProperty } from '@nestjs/swagger';

export class User {
  /**
   * The name of the User
   * @example User
   */
  @ApiProperty({ example: 1, description: 'The User Id' })
  userId: number;

  @ApiProperty({ example: 'Sunil Kumar', description: 'The Name of the User' })
  userName: string;

  @ApiProperty({
    example: 'sunil@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'xxxxxxxxx',
    description: 'The password of the user',
  })
  password: string;
}
