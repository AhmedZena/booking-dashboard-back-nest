import { Module } from '@nestjs/common';
import { CombinedBookingService } from './combined-booking.service';
import { CombinedBookingController } from './combined-booking.controller';
import { BusBookingModule } from '../bus-booking/bus-booking.module';
import { FlightBookingModule } from '../flight-booking/flight-booking.module';
import { HotelBookingModule } from '../hotel-booking/hotel-booking.module';
import { TransferBookingModule } from '../transfer-booking/transfer-booking.module';

@Module({
  imports: [BusBookingModule, FlightBookingModule, HotelBookingModule, TransferBookingModule],
  controllers: [CombinedBookingController],
  providers: [CombinedBookingService],
})
export class CombinedBookingModule { }
