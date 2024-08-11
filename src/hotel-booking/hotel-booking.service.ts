import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class HotelBookingService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: Connection
  ) { }

  async getBookingsByDay(day: string): Promise<any> {
    console.log('day', day); // day 2021-08-01
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM hotel_booking WHERE checkIn LIKE '${day}%'`,
        (error, results) => {
          if (error) {
            return reject(error);
          }

          const totalSales = results.reduce(
            (accumulator, currentValue) => accumulator + +currentValue.price,
            0,
          );
          console.log(totalSales);

          resolve({
            totalBookings: results?.length || 0,
            totalSales: Math.round(totalSales),
            results,
          });
        },
      );
    });
  }

  async getBookingsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM hotel_booking WHERE checkIn BETWEEN '${from}' AND '${to}'`,
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
