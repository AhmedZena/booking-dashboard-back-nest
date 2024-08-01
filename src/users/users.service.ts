import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly dbConnection: Connection) { }

  async getUsersRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM users WHERE lastActive BETWEEN '${from}' AND '${to}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }

          // const totalSales = results.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);
          // const totalPoints = results.reduce((accumulator, currentValue) => accumulator + +currentValue.points, 0);

          //  add key for percentage

          resolve({
            totalUsers: results?.length || 0,
            results,
          });
        },
      );
    });
  }

  // get all users
  async getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM users`,
        (error, results) => {
          if (error) {
            reject(error);
          }

          resolve({
            totalUsers: results?.length || 0,
            results,
          });
        },
      );
    });
  }
}
