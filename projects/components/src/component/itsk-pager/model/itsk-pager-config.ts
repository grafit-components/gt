export class ItskPagerConfig {
  pageSize: string;
  pagesCount: string;
  recordsCount: string;

  constructor(pageSize: string, pagesCount: string, recordsCount: string) {
    this.pageSize = pageSize;
    this.pagesCount = pagesCount;
    this.recordsCount = recordsCount;
  }
}
