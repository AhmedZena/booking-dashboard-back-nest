// src/flight-booking/flight-booking.module.ts
import { Module } from '@nestjs/common';
import { NotificationsService} from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService], // Ensure the service is exported
})
export class NotificationsModule { }
