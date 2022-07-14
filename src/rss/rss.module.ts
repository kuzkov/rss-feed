import { Module } from '@nestjs/common';

import { RssManagerService } from './rss-manager.service';

@Module({
  providers: [RssManagerService],
  exports: [RssManagerService],
})
export class RssModule {}
