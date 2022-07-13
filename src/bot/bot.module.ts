import { Module } from '@nestjs/common';

import { ChannelModule } from 'src/channel/channel.module';
import { BotUpdate } from './bot.update';

@Module({
  imports: [ChannelModule],
  providers: [BotUpdate],
})
export class BotModule {}
