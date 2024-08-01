import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class EarningsService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: Connection,
  ) { }

  async getEarningsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM payment WHERE firstCreated BETWEEN '${from}' AND '${to}'`,
        (error, results) => {
          if (error) {
            reject(error);
          }

          // calc all amount
          const totalAmount = results.reduce((sum, earning) => sum + (earning.amount || 0), 0);

          // Filter results for captured status
          const capturedEarnings = results.filter(earning => earning.status === 'captured');

          // Calculate total earnings amount
          const totalCapturedAmount = capturedEarnings.reduce((sum, earning) => sum + (earning.amount || 0), 0);

          // Count the number of sales done
          const numberOfSalesDone = capturedEarnings.length;

          // Return the total earnings and captured details
          resolve({
            totalSales: results?.length || 0,
            numberOfSalesDone,
            totalAmount,
            totalCapturedAmountDone: totalCapturedAmount,
            earningsCaptured: capturedEarnings,
          });
        }
      );
    });
  }
}
