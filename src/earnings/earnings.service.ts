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

          // Group earnings by day and sum amounts
          const groupedByDay = results.reduce((acc, earning) => {
            const date = new Date(earning.firstCreated).toISOString().split('T')[0];
            if (!acc[date]) {
              acc[date] = { date, totalAmount: 0};
            }
            acc[date].totalAmount += earning.amount || 0;
          
            return acc;
          }, {});

          const earningsByDay = Object.values(groupedByDay);

          // Calculate total amounts
          const totalAmount = earningsByDay.reduce((sum, day:any) => sum + day.totalAmount, 0);

          // Filter results for captured status
          const capturedEarnings = results.filter(earning => earning.status === 'captured');

          // Calculate total captured amount
          const totalCapturedAmount = capturedEarnings.reduce((sum, earning) => sum + (earning.amount || 0), 0);

          // Count the number of sales done
          const numberOfSalesDone = capturedEarnings.length;

          // Return the grouped earnings by day and other details
          resolve({
            totalSales: results?.length || 0,
            numberOfSalesDone,
            totalAmount,
            totalCapturedAmountDone: totalCapturedAmount,
            earningsByDay,
          });
        }
      );
    });
  }
}
