import { Module } from '@nestjs/common';
import Parser from 'rss-parser';

import { ChannelModule } from 'src/channel/channel.module';
import { RssManagerService } from './rss-manager.service';
import { RssParserService } from './rss-parser.service';
import { RssStorageService } from './rss-storage.service';
import { RssService } from './rss.service';

export const PARSER_INTERVAL = 30000;

@Module({
  imports: [ChannelModule],
  providers: [
    RssService,
    RssParserService,
    RssStorageService,
    RssManagerService,
    {
      provide: 'PARSER',
      useFactory: () => new Parser({ timeout: PARSER_INTERVAL }),
    },
  ],
  exports: [RssManagerService],
})
export class RssModule {}
