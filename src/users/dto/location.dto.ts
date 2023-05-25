import { IsNumber } from 'class-validator';

export class LocationDTO {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}
