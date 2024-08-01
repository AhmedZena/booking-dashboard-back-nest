// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { GetBookingsRangeDto } from 'src/validator/dto/get-bookings-range.dto';

@Controller('earnings')
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) { }

  @Get()
  async getnotificationsRang(@Query() query: GetBookingsRangeDto) {
    return this.earningsService.getEarningsInRange(query.from, query.to);
  }
}
