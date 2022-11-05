import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const telegramValidationSchema = Joi.object({
  botToken: Joi.string(),
  channelId: Joi.string(),
});

export default registerAs('telegram', () => ({
  botToken: process.env.BOT_TOKEN,
  channelId: process.env.CHANNEL_ID,
}));
