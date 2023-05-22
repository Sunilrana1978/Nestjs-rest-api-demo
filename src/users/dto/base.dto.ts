import { IsDateString } from 'class-validator';

export abstract class BaseDto {
  @IsDateString()
  createdAt: string = new Date().toISOString();
}
