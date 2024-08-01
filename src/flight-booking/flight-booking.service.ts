import { Injectable, Inject } from '@nestjs/common';
import { Connection, RowDataPacket } from 'mysql2/promise';
import { IFlightBooking } from 'src/interfaces';

@Injectable()
export class FlightBookingService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly dbConnection: Connection) { }

  async getBookingsByDay(day: string): Promise<any> {
    console.log('day', day); // day 2021-08-01
    return new Promise((resolve, reject) => {
      this.dbConnection.query(`SELECT * FROM flight_booking WHERE depTime LIKE '${day}%'`, (error, results) => {
        if (error) {
          reject(error);
        }

        const totalSales = results.reduce(
          (accumulator, currentValue) => accumulator + +currentValue.price,
          0,
        );

        console.log(totalSales)

        // totalSales = results.reduce(())

        resolve({
          totalBookings: results?.length || 0,
          totalSales: Math.round(totalSales),
          results
        });
      });
    });
  }
  
  async getBookingsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM flight_booking WHERE depTime BETWEEN '${from}' AND '${to}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }

          const totalSales = results.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);

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
