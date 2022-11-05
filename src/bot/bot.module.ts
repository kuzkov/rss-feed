import { Module } from '@nestjs/common';

import { RssModule } from 'src/rss/rss.module';
import { BotUpdate } from './bot.update';

@Module({
  imports: [RssModule],
  providers: [BotUpdate],
})
export class BotModule {}
