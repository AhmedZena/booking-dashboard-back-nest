// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { HotelBookingController } from './hotel-booking.controller';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelBookingController],
  providers: [HotelBookingService],
  exports: [HotelBookingService], // Ensure the service is exported
})
export class HotelBookingModule { }
