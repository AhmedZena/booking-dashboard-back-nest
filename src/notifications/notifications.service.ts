import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dbConnection: Connection,
  ) { }

  async getNotificationsInRange(from: string, to: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbConnection.query(
        `SELECT * FROM notification_users WHERE firstCreated BETWEEN '${from}' AND '${to}'`,
        (errorUsers, resultsUsers) => {
          if (errorUsers) {
            reject(errorUsers);
          }

          // put all users ids in arr
          const allUsersIds = resultsUsers.map(user => user.userId);

          // Calculate the number of unique users
          const uniqueUserIds = new Set(resultsUsers.map(user => user.userId));
          const numberOfUniqueUsers = uniqueUserIds.size;

          // arr of unique users ids
          const uniqueUsersIds = Array.from(uniqueUserIds);
          
         

          this.dbConnection.query(
            `SELECT * FROM notificaton_messages WHERE firstCreated BETWEEN '${from}' AND '${to}'`,
            (errorMessages, resultsMessages) => {
              if (errorMessages) {
                reject(errorMessages);
              }

              resolve({
                totalNotificationUsers: resultsUsers?.length || 0,
                numberOfUniqueUsers: numberOfUniqueUsers,
                totalNotificationMessages: resultsMessages?.length || 0,
                notificationUsers: resultsUsers,
                notificationMessages: resultsMessages,
              });
            },
          );
        },
      );
    });
  }
}
