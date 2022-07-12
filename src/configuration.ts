export interface EnvironmentVariables {
  telegram: {
    botToken: string;
    channelId: string;
  };
}

export default (): EnvironmentVariables => ({
  telegram: {
    botToken: process.env.BOT_TOKEN,
    channelId: process.env.CHANNEL_ID,
  },
});
