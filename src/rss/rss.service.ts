import { Injectable } from '@nestjs/common';
import { filter, some } from 'lodash';
import Parser, { Item } from 'rss-parser';
import { Observable, Subject } from 'rxjs';

import { FileStorageService } from './../core/file-storage.service';

export const PARSE_INTERVAL = 10000;

export type ParseResult = {
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>;

interface RssListItem {
  name: string;
  link: string;
  failed: boolean;
}

@Injectable()
export class RssService {
  get posts$(): Observable<Item> {
    return this.posts.asObservable();
  }

  private posts = new Subject<Item>();
  private rssFeedList: Array<RssListItem> = [];

  constructor(private fileStorage: FileStorageService) {
    this.subscribe(
      'Whitehouse',
      'https://www.whitehouse.gov/briefing-room/feed/',
    );
  }

  subscribe(name: string, link: string) {
    if (some(this.rssFeedList, { name })) {
      throw new Error(`Rss with "${name}" name already exists`);
    }

    if (some(this.rssFeedList, { link })) {
      throw new Error(`Rss with "${name}" link already exists`);
    }

    const rssFeed = { name, link, failed: false };

    this.rssFeedList.push(rssFeed);
    this.startParsingWithInterval(rssFeed);

    console.log(`Subscribed to ${name}: ${link}`);
  }

  unsubscribe(name: string) {
    this.rssFeedList = filter(this.rssFeedList, { name });
  }

  getSubscriptions() {
    return this.rssFeedList;
  }

  private startParsingWithInterval(rssFeed: RssListItem) {
    if (!some(this.rssFeedList, rssFeed)) return;

    const { name, link } = rssFeed;

    setTimeout(async () => {
      try {
        const posts = await this.fetchNewPosts(name, link);
        posts.forEach((post) => this.posts.next(post));
        this.startParsingWithInterval(rssFeed);
      } catch (error) {
        rssFeed.failed = true;
        console.error(error);
        console.log(this.rssFeedList);
      }
    }, PARSE_INTERVAL);
  }

  // TODO: Refactor any type to post model
  private async fetchNewPosts(name: string, link: string): Promise<Array<any>> {
    console.log(`Start fetching new rss: ${name}`);

    const parser = new Parser();
    const rss = await parser.parseURL(link);
    const previousRss = await this.fileStorage.get<ParseResult>(name);

    if (!previousRss) {
      console.log(`Previous file with rss feed wasn't found: ${name}`);
      await this.fileStorage.save(name, rss);
      return rss.items;
    }

    const newPosts = this.filterNewPosts(rss, previousRss);
    await this.fileStorage.save(name, rss);

    console.log(
      newPosts.length
        ? `${newPosts.length} were found: ${name}`
        : `New posts were not found: ${name}`,
    );
    console.log(`End fetch new rss: ${name}`);

    return newPosts;
  }

  private filterNewPosts(rss, previousRss) {
    return rss.items.filter(
      (newItem) =>
        !previousRss.items.find((item) => item.title === newItem.title),
    );
  }
}
