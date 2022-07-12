export interface EnvironmentVariables {
  telegram: {
    botToken: string;
  };
}

export default (): EnvironmentVariables => ({
  telegram: {
    botToken: process.env.BOT_TOKEN,
  },
});
