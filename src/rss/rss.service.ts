import { Injectable } from '@nestjs/common';
import { Item } from 'rss-parser';
import { Observable, Subject } from 'rxjs';

import { ChannelService } from './../channel/channel.service';
import { RssParserService } from './rss-parser.service';
import { RssStorageService } from './rss-storage.service';
import { PARSER_INTERVAL } from './rss.module';

@Injectable()
export class RssService {
  private interaval: NodeJS.Timer;

  private links = [
    'http://kremlin.ru/events/all/feed',
    'https://ec.europa.eu/info/news/feed_en?pages=184419',
    'https://www.whitehouse.gov/briefing-room/feed/',
  ];

  private postMessage = new Subject<Item>();

  get postMessage$(): Observable<Item> {
    return this.postMessage.asObservable();
  }

  constructor(
    private rssParserService: RssParserService,
    private rssStorageService: RssStorageService,
    private channelService: ChannelService,
  ) {
    this.startParserInterval();

    this.postMessage$.subscribe((post) => {
      this.channelService.postMessage({
        title: '',
        text: post.title,
        author: '',
        date: new Date(),
        href: '',
      });
    });
  }

  private async parseLink(link: string) {
    try {
      console.log(`Start parsing: ${link}`);

      const rss = await this.rssParserService.parseUrl(link);
      const previousRss = await this.rssStorageService.getPrevious(rss.title);

      if (!previousRss) {
        await this.rssStorageService.save(rss.title, rss);
        return;
      }

      const newPosts = rss.items.filter((newItem) => {
        return !previousRss.items.find((item) => item.title === newItem.title);
      });

      if (!newPosts.length) {
        console.log(`NOT FOUND NEW POSTS ${rss.link}`);
        return;
      }

      newPosts.forEach((post) => {
        this.postMessage.next(post);
      });

      const isSaved = await this.rssStorageService.save(rss.title, rss);

      if (!isSaved) throw new Error(`File dont saved ${rss.title}`);
    } catch (e) {
      console.log(e);
    }
  }

  private startParserInterval() {
    this.interaval = setInterval(async () => {
      try {
        await Promise.all(this.links.map((link) => this.parseLink(link)));
      } catch {
        console.log('error');
      }
    }, PARSER_INTERVAL);
  }
}
