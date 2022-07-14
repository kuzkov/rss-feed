import { Injectable } from '@nestjs/common';

@Injectable()
export class RssManagerService {
  private rssList: Record<string, string> = {};

  async add(name: string, href: string) {
    this.rssList[name] = href;
  }

  remove(name: string) {
    delete this.rssList[name];
  }

  list() {
    return this.rssList;
  }
}
