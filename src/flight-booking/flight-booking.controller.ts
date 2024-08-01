// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { FlightBookingService } from './flight-booking.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';

@Controller('flight-booking')
export class FlightBookingController {
  constructor(private readonly flightBookingService: FlightBookingService) { }

  @Get()
  async getBookingsByDay(@Query() query: GetBookingsDto) {
    return this.flightBookingService.getBookingsByDay(query.day);
  }
}
