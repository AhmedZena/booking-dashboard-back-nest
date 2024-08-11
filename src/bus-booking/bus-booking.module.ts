// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { BusBookingService } from './bus-booking.service';
import { BusBookingController } from './bus-booking.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [BusBookingController],
  providers: [BusBookingService],
  exports: [BusBookingService], // Ensure the service is exported
})
export class BusBookingModule { }
