// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { TransferBookingService } from './transfer-booking.service';
import { TransferBookingController } from './transfer-booking.controller';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TransferBookingController],
  providers: [TransferBookingService],
  exports: [TransferBookingService], // Ensure the service is exported
})
export class TransferBookingModule { }
