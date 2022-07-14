import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import ellipsize from 'ellipsize';
import { InjectBot } from 'nestjs-telegraf';
import { concatMap, ignoreElements, startWith, timer } from 'rxjs';
import { Context, Telegraf } from 'telegraf';

import telegramConfig from 'src/config/telegram.config';
import { RssService } from './../rss/rss.service';
import { PostMessage } from './models/post-message.model';

@Injectable()
export class ChannelService {
  private readonly MESSAGE_DELAY = 3500;

  constructor(
    @InjectBot() private bot: Telegraf<Context>,
    @Inject(telegramConfig.KEY)
    private tgConfig: ConfigType<typeof telegramConfig>,
    private rssService: RssService,
  ) {
    this.rssService.posts$
      .pipe(
        concatMap((value) =>
          timer(this.MESSAGE_DELAY).pipe(ignoreElements(), startWith(value)),
        ),
      )
      .subscribe((post) => {
        this.postMessage({
          title: post.title,
          text: ellipsize(post.contentSnippet, 500),
          author: post.creator,
          date: new Date(post.pubDate),
          href: post.link,
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
      `*${title}*\n` +
      `${text}\n` +
      `_${author} - ${date.toUTCString()}_\n\n` +
      `${href}`
    );
  }
}
