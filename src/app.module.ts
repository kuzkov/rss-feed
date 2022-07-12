import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot.service';
import { ChannelModule } from './channel/channel.module';
import configuration, { EnvironmentVariables } from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        telegram: Joi.object({
          botToken: Joi.string().required(),
        }),
      }),
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<EnvironmentVariables>) {
        return {
          token: configService.get('telegram.botToken', { infer: true }),
        };
      },
    }),
    ChannelModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, BotService],
})
export class AppModule {}
