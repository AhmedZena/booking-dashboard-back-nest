// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { EngagementService} from './engagement.service';
import { EngagementController } from './engagement.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // Add UsersModule here

  controllers: [EngagementController],
  providers: [EngagementService],
  exports: [EngagementService], // Ensure the service is exported
})
export class EngagementModule { }
