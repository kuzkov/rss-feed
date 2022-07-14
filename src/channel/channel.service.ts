import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import mdEscape from 'markdown-escape';
import { InjectBot } from 'nestjs-telegraf';
import { concatMap, ignoreElements, startWith, timer } from 'rxjs';
import { Context, Telegraf } from 'telegraf';

import telegramConfig from 'src/config/telegram.config';
import { RssService } from './../rss/rss.service';
import { PostMessage } from './models/post-message.model';

@Injectable()
export class ChannelService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @Inject(telegramConfig.KEY)
    private tgConfig: ConfigType<typeof telegramConfig>,
    private rssService: RssService,
  ) {
    this.rssService.posts$
      .pipe(
        concatMap((value) =>
          timer(2000).pipe(ignoreElements(), startWith(value)),
        ),
      )
      .subscribe((post) => {
        this.postMessage({
          title: post.title,
          text: post.content,
          author: post.creator,
          date: new Date(post.pubDate),
          href: '',
        });
      });
  }

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
