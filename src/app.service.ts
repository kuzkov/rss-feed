import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getBotToken(): string {
    return process.env.BOT_TOKEN;
  }
}
