import { Module } from '@nestjs/common';

import { BotModule } from './bot/bot.module';
import { ChannelModule } from './channel/channel.module';
import { CoreModule } from './core/core.module';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [CoreModule, ChannelModule, BotModule, RssModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
