import { IsNotEmpty, IsDateString } from 'class-validator';

export class GetBookingsRangeDto {
  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsNotEmpty()
  @IsDateString()
  to: string;
}
