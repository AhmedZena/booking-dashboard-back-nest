import { Injectable , Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly dbConnection: any) { }

  getHello(): string {
    return 'Hello World!';
  }

 
}
