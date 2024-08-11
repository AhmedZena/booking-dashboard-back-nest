// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { HotelBookingController } from './hotel-booking.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule , UsersModule], // Add UsersModule here
  controllers: [HotelBookingController],
  providers: [HotelBookingService],
  exports: [HotelBookingService], // Ensure the service is exported
})
export class HotelBookingModule { }
