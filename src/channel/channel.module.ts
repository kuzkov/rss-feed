import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/configuration';
import { Telegram } from 'telegraf';
import { ChannelService } from './channel.service';

export const TELEGRAM_BOT = 'TELEGRAM_BOT';

@Module({})
export class ChannelModule {
  static forRoot(): DynamicModule {
    return {
      module: ChannelModule,
      providers: [
        ChannelService,
        {
          provide: TELEGRAM_BOT,
          useFactory(configService: ConfigService<EnvironmentVariables>) {
            const token = configService.get('telegram.botToken', {
              infer: true,
            });

            return new Telegram(token);
          },
          inject: [ConfigService],
        },
      ],
      exports: [ChannelService],
    };
  }
}
