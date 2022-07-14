import { Inject, Injectable } from '@nestjs/common';
import Parser from 'rss-parser';

export type ParseResult = {
  [key: string]: any;
} & Parser.Output<{
  [key: string]: any;
}>;

@Injectable()
export class RssParserService {
  constructor(@Inject('PARSER') private parser: Parser) {}

  parseUrl(url: string): Promise<ParseResult> {
    return this.parser.parseURL(url);
  }
}
