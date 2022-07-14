import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import telegramConfig from 'src/config/telegram.config';
import { PostMessage } from './models/post-message.model';

@Injectable()
export class ChannelService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @Inject(telegramConfig.KEY)
    private tgConfig: ConfigType<typeof telegramConfig>,
  ) {}

  async postMessage({ text }: PostMessage) {
    console.log(text);
    await this.bot.telegram.sendMessage(this.tgConfig.channelId, text);
  }
}
