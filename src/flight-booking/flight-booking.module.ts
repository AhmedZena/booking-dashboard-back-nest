// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { FlightBookingService } from './flight-booking.service';
import { FlightBookingController } from './flight-booking.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule], // Add UsersModule here
  controllers: [FlightBookingController],
  providers: [FlightBookingService],
  exports: [FlightBookingService], // Ensure the service is exported
})
export class FlightBookingModule { }
