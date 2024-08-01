import { IsDateString } from 'class-validator';

export class GetBookingsDto {
  @IsDateString()
  day: string;
}
