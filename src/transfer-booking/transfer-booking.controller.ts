import { Controller, Get, Query } from '@nestjs/common';
import { TransferBookingService } from './transfer-booking.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';

@Controller('transfer-booking')
export class TransferBookingController {
  constructor(private readonly transferBookingService: TransferBookingService) { }

  @Get()
  async getBookingsByDay(@Query() query: GetBookingsDto) {
    return this.transferBookingService.getBookingsByDay(query.day);
  }
}
