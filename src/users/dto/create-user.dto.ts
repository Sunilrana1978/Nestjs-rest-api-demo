import { IsNotEmpty, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
