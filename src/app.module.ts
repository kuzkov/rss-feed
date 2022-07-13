import { Module } from '@nestjs/common';

import { BotModule } from './bot/bot.module';
import { ChannelModule } from './channel/channel.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ChannelModule, CoreModule, BotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
