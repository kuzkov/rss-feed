import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/configuration';
import { Telegram } from 'telegraf';
import { TELEGRAM_BOT } from './channel.module';

@Injectable()
export class ChannelService {
  private readonly channelId: string;

  constructor(
    @Inject(TELEGRAM_BOT) private readonly telegramBot: Telegram,
    configService: ConfigService<EnvironmentVariables>,
  ) {
    this.channelId = configService.get('telegram.channelId', { infer: true });
  }

  sendMessage(text: string) {
    return this.telegramBot.sendMessage(this.channelId, text);
  }
}
