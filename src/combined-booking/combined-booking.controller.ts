import { Controller, Get, Query } from '@nestjs/common';
import { CombinedBookingService } from './combined-booking.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';
import { GetBookingsRangeDto } from 'src/validator/dto/get-bookings-range.dto';

@Controller('combined-booking')
export class CombinedBookingController {
  constructor(private readonly combinedBookingService: CombinedBookingService) { }

  @Get('all-bookings')
  async getAllBookings(@Query() query: GetBookingsDto) {
    const { day } = query;
    return this.combinedBookingService.getAllBookingsByDay(day);
  }

  @Get('bookings-range')
  async getBookingsInRange(@Query() query: GetBookingsRangeDto) {
    const { from, to } = query;
    return this.combinedBookingService.getBookingsInRange(from, to);
  }
}
