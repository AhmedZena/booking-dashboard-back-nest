// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GetBookingsRangeDto } from 'src/validator/dto/get-bookings-range.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationstService: NotificationsService) { }

  @Get()
  async getnotificationsRang(@Query() query: GetBookingsRangeDto) {
    return this.notificationstService.getNotificationsInRange(query.from, query.to);
  }
}
