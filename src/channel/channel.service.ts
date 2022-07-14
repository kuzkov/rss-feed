import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import mdEscape from 'markdown-escape';
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

  async postMessage(post: PostMessage) {
    await this.bot.telegram.sendMessage(
      this.tgConfig.channelId,
      this.formatMessage(post),
      { parse_mode: 'Markdown' },
    );
  }

  private formatMessage({ title, text, author, date, href }: PostMessage) {
    return (
      `*${mdEscape(title)}*\n` +
      `${mdEscape(text)}\n` +
      `_${mdEscape(author)} - ${mdEscape(date.toUTCString())}_\n\n` +
      `${href}`
    );
  }
}
