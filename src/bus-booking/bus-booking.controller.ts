// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { BusBookingService } from './bus-booking.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';

@Controller('bus-booking')
export class BusBookingController {
  constructor(private readonly busBookingService: BusBookingService) { }

  @Get()
  async getBookingsByDay(@Query() query: GetBookingsDto) {
    return this.busBookingService.getBookingsByDay(query.day);
  }
}
