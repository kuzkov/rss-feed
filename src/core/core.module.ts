import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { TelegrafModule } from 'nestjs-telegraf';

import telegramConfig, {
  telegramValidationSchema,
} from 'src/config/telegram.config';
import { FileStorageService } from './file-storage.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [telegramConfig],
      validationSchema: Joi.object({
        telegram: telegramValidationSchema,
      }),
    }),
    TelegrafModule.forRootAsync({
      inject: [telegramConfig.KEY],
      useFactory: (tgConfig: ConfigType<typeof telegramConfig>) => ({
        token: tgConfig.botToken,
      }),
    }),
  ],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class CoreModule {}
