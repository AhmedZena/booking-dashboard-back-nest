import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class TransferBookingService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly dbConnection: Connection) { }

  async getBookingsByDay(day: string): Promise<any> {
    console.log('day', day); // day 2021-08-01
    return new Promise((resolve, reject) => {
      this.dbConnection.query(`SELECT * FROM transfer_booking WHERE date LIKE '${day}%'`, (error, results) => {
        if (error) {
          reject(error);
        }

        const totalSales = results.reduce(
          (accumulator, currentValue) => accumulator + +currentValue.price,
          0,
        );
        console.log(totalSales)
        resolve({
          totalBookings: results.length,
          totalSales: Math.round(totalSales),
          results,
        });
      });
    });
  }

  async getBookingsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM transfer_booking WHERE date BETWEEN '${from}' AND '${to}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }

          const totalSales = results.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);

          resolve({
            totalBookings: results.length,
            totalSales: Math.round(totalSales),
            results,
          });
        },
      );
    });
  }
  
}
