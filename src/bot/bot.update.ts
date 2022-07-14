import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  // constructor() {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply(
      'Welcome!\n' +
        'To add rss /add {name} {href}\n' +
        'To remove /remove {name}\n' +
        'To list all rss /list',
    );
  }

  // @Command('add')
  // async add(@Ctx() ctx: Context) {
  //   if (!('text' in ctx.message)) {
  //     await ctx.reply('Cannot find text in ctx');
  //     return;
  //   }

  //   const [name, href, ...rest] = ctx.message.text.split(' ').slice(1);

  //   if (!name || !href || rest.length) {
  //     await ctx.reply('Incorrect command');
  //     return;
  //   }

  //   const rssList = this.rssManager.list();

  //   if (Object.keys(rssList).includes(name)) {
  //     await ctx.reply('Name already exists. Choose another one');
  //     return;
  //   }

  //   if (Object.values(rssList).includes(href)) {
  //     await ctx.reply('This rss link already exists.');
  //     return;
  //   }

  //   try {
  //     await this.rssManager.add(name, href);
  //     await ctx.reply(`Added ${name} - ${href}`);
  //   } catch (error) {
  //     await ctx.reply("Error occured, can't add rss link");
  //   }
  // }

  // @Command('remove')
  // async remove(@Ctx() ctx: Context) {
  //   if (!('text' in ctx.message)) {
  //     await ctx.reply('Cannot find text in ctx');
  //     return;
  //   }

  //   const [name, ...rest] = ctx.message.text.split(' ').slice(1);

  //   if (!name || rest.length) {
  //     await ctx.reply('Incorrect command');
  //     return;
  //   }

  //   const rssList = this.rssManager.list();

  //   if (!Object.keys(rssList).includes(name)) {
  //     await ctx.reply("Rss link with such name doesn't exist");
  //     return;
  //   }

  //   this.rssManager.remove(name);
  //   await ctx.reply(`Removed ${name}`);
  // }

  // @Command('list')
  // async list(@Ctx() ctx: Context) {
  //   const rssList = this.rssManager.list();

  //   if (!Object.keys(rssList).length) {
  //     await ctx.reply('Empty list');
  //     return;
  //   }

  //   let formattedMessage = 'List:\n';
  //   for (const name in rssList) {
  //     formattedMessage += `${name}: ${rssList[name]}\n`;
  //   }

  //   await ctx.reply(formattedMessage);
  // }
}
