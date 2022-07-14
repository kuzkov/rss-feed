import fs from 'fs';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';

import { ParseResult } from './rss-parser.service';

@Injectable()
export class RssStorageService {
  private readonly STORAGE_PATH = './rss-storage';

  constructor() {
    if (!this.checkIfFileOrDirectoryExists(this.STORAGE_PATH)) {
      fs.mkdirSync(this.STORAGE_PATH);
    }
  }

  private readFile = promisify(fs.readFile);

  private writeFile = promisify(fs.writeFile);

  private checkIfFileOrDirectoryExists(path: string): boolean {
    return fs.existsSync(path);
  }

  async getPrevious(fileName: string): Promise<ParseResult> {
    const path = `${this.STORAGE_PATH}/${fileName}.json`;

    if (this.checkIfFileOrDirectoryExists(path)) {
      const res = await this.readFile(path, { encoding: 'utf8' });

      return JSON.parse(res);
    }

    return null;
  }

  async save(fileName: string, rss: ParseResult): Promise<boolean> {
    const path = `${this.STORAGE_PATH}/${fileName}.json`;

    const json = JSON.stringify(rss);

    return this.writeFile(path, json)
      .then(() => true)
      .catch((e) => {
        console.log(e);
        return false;
      });
  }
}
