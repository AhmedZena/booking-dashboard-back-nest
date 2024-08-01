import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EngagementService {
  // constructor(@Inject('DATABASE_CONNECTION')
  // private readonly dbConnection: Connection), private readonly usersService: UsersService { }
constructor(
  @Inject('DATABASE_CONNECTION')
  private readonly dbConnection: Connection,
  private readonly usersService: UsersService // Corrected syntax
) { }

  async getEngagementInRange(from: string, to: string): Promise < any > {
    const users = await this.usersService.getAllUsers();
    console.log('users', users);
    const totalUsers = users.totalUsers;
  return new Promise((resolve, reject) => {
    this.dbConnection.query(
      `SELECT * FROM engagementStatus WHERE firstCreated BETWEEN '${from}' AND '${to}'`,
      (error, results) => {
        if (error) {
          reject(error);
        }

        // const totalSales = results.reduce((accumulator, currentValue) => accumulator + +currentValue.price, 0);
        const totalPoints = results.reduce((accumulator, currentValue) => accumulator + +currentValue.points, 0);

        //  add key for percentage
        const newResults = results.map((result) => {
          const percentage = Math.round((+result.points / totalPoints) * 100);

          return {
            ...result,
            percentage,
          };
        }
        );

        resolve({
          totalEngagement: results?.length || 0,
          totalPoints,
          totalUsers,
          results: newResults,
        });
      },
    );
  });
}
}
