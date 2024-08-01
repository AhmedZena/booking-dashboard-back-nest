// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';

@Controller('hotel-booking')
export class HotelBookingController {
  constructor(private readonly hotelBookingService: HotelBookingService) { }

  @Get()
  async getBookingsByDay(@Query() query: GetBookingsDto) {
    return this.hotelBookingService.getBookingsByDay(query.day);
  }
}
