// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { FlightBookingService } from './flight-booking.service';
import { FlightBookingController } from './flight-booking.controller';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FlightBookingController],
  providers: [FlightBookingService],
  exports: [FlightBookingService], // Ensure the service is exported
})
export class FlightBookingModule { }
