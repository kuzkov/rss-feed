import { Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ChannelService } from './channel/channel.service';

@Update()
export class BotService {
  constructor(private channelService: ChannelService) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: Context) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }

  @Hears('Test')
  async sendTest() {
    this.channelService.sendMessage(new Date().toUTCString());
  }
}
