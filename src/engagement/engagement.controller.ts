// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { EngagementService } from './engagement.service';
import { GetBookingsDto } from 'src/validator/dto/get-bookings.dto';
import { GetBookingsRangeDto } from 'src/validator/dto/get-bookings-range.dto';

@Controller('engagement')
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) { }

  @Get()
  async getengagementRang(@Query() query: GetBookingsRangeDto) {
    return this.engagementService.getEngagementInRange(query.from, query.to);
  }
}
