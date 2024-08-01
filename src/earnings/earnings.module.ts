// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { EarningsService} from './earnings.service';
import { EarningsController } from './earnings.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [EarningsController],
  providers: [EarningsService],
  exports: [EarningsService], // Ensure the service is exported
})
export class EarningsModule { }
