import fs from 'fs';
import path from 'path';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FileStorageService {
  private readonly STORAGE_PATH = './file-storage';

  constructor() {
    if (!fs.existsSync(this.STORAGE_PATH)) {
      fs.mkdirSync(this.STORAGE_PATH);
    }
  }

  async get<T>(fileName: string): Promise<T | null> {
    const pathname = path.join(this.STORAGE_PATH, `${fileName}.json`);

    if (!fs.existsSync(pathname)) {
      return null;
    }

    const fileData = await fs.promises.readFile(pathname, { encoding: 'utf8' });

    return JSON.parse(fileData) as T;
  }

  async save<T>(fileName: string, data: T) {
    const pathname = path.join(this.STORAGE_PATH, `${fileName}.json`);
    const json = JSON.stringify(data);

    try {
      await fs.promises.writeFile(pathname, json);
    } catch {
      console.error(`File with "${pathname}" name wasn't saved`);
    }
  }
}
