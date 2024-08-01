// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { BusBookingService } from './bus-booking.service';
import { BusBookingController } from './bus-booking.controller';

@Module({
  imports: [],
  controllers: [BusBookingController],
  providers: [BusBookingService],
  exports: [BusBookingService], // Ensure the service is exported
})
export class BusBookingModule { }
