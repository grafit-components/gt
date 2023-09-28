import {GridRow, IId} from './grid-row';
import {Paging} from '../../itsk-pager/model/paging';

export class GridResponse<T extends IId> {
  paging?: Paging;
  result: GridRow<T>[] = [];

  constructor(options?: {
    paging?: any;
    result?: any[];
  }) {
    if (options) {
      this.paging = new Paging(options.paging);
      if (options.result && options.result instanceof Array) {
        options.result.forEach((data) => {
          this.result.push(new GridRow(data));
        });
      }
    }
  }
}
