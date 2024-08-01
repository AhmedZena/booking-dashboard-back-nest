import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './config/database.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { BusBookingModule } from './bus-booking/bus-booking.module';
import { HotelBookingModule } from './hotel-booking/hotel-booking.module';
import { TransferBookingModule } from './transfer-booking/transfer-booking.module';
import { CombinedBookingModule } from './combined-booking/combined-booking.module';
import { EngagementModule } from './engagement/engagement.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EarningsModule } from './earnings/earnings.module';

@Module({
  imports: [
    // DatabaseModule,    
    FlightBookingModule,
    BusBookingModule,
    HotelBookingModule,
    TransferBookingModule, 
    CombinedBookingModule,
    EngagementModule, 
    UsersModule,
    NotificationsModule,
    EarningsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}