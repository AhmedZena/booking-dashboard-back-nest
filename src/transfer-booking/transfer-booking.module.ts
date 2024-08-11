// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { TransferBookingService } from './transfer-booking.service';
import { TransferBookingController } from './transfer-booking.controller';
import { DatabaseModule } from 'src/config/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule , UsersModule], // Add UsersModule here
  controllers: [TransferBookingController],
  providers: [TransferBookingService],
  exports: [TransferBookingService], // Ensure the service is exported
})
export class TransferBookingModule { }
