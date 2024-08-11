// src/flight-booking/flight-booking.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetBookingsRangeDto } from 'src/validator/dto/get-bookings-range.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getengagementRang(@Query() query: GetBookingsRangeDto) {
    return this.usersService.getUsersRange(query.from, query.to);
  }

  @Get('all')
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('one')
  async getUser(@Query('id') id: string) {
    return this.usersService.getUserById(+id); // example : http://localhost:3000/users/one?id=1
  }
}
