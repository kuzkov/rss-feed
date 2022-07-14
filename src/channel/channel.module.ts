import { Module } from '@nestjs/common';

import { RssModule } from 'src/rss/rss.module';
import { ChannelService } from './channel.service';

@Module({
  imports: [RssModule],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
