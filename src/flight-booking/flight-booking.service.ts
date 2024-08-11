import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FlightBookingService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: Connection,
    private readonly usersService: UsersService
  ) { }

  async getBookingsByDay(day: string): Promise<any> {
    console.log('day', day); // day 2021-08-01

    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM flight_booking WHERE depTime LIKE '${day}%'`,
        async (error, results) => {
          if (error) {
            return reject(error);
          }

          const totalSales = results.reduce(
            (accumulator, currentValue) => accumulator + +currentValue.price,
            0,
          );

          // Use Promise.all to wait for all user fetching operations to complete
          const enrichedResults = await Promise.all(
            results.map(async (result) => {
              const user = await this.usersService.getUserById(+result.userId);
              console.log('user', user);
              result.user = {
                name: user?.firstName + ' ' + user?.lastName,
                phone: user?.phone,
                email: user?.email,
              };
              return result;
            }),
          );

          resolve({
            totalBookings: enrichedResults?.length || 0,
            totalSales: Math.round(totalSales),
            results: enrichedResults,
          });
        },
      );
    });
  }

  async getBookingsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM flight_booking WHERE depTime BETWEEN '${from}' AND '${to}'`,
        (error, results) => {
          if (error) {
            return reject(error);
          }

          const totalSales = results.reduce(
            (accumulator, currentValue) => accumulator + +currentValue.price,
            0,
          );

          resolve({
            totalBookings: results?.length || 0,
            totalSales: Math.round(totalSales),
            results,
          });
        },
      );
    });
  }
}
