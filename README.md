# Goal of the project

The main goal of this project is to learn how to parse rss feed from multiple sources and send messages to the telegram channel.

## Why I built the project this way

I didn't use any database, cause it would be overhead for this project. Instead I decided to use simple files to store all parsed rss feeds. To show all parsed rss feeds I've chosen Telegram API. It's only the beginning of the project, so there are so many things to do.

## Todo
1. Add frontend part with basic design and features
2. Add nx or any other monorepo tools
3. Separate rss parsing from telegram bot
4. Add support of cache control. Do not parse rss until cache is not stale

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
