export class ItskGridDictionary {
  filter: string;
  apply: string;
  clear: string;
  clearFilter: string;
  detail: string;
  pinColumn: string;
  unpinColumn: string;

  constructor(dict: {
    filter: string;
    apply: string;
    clear: string;
    clearFilter: string;
    detail: string;
    pinColumn: string;
    unpinColumn: string;
  }) {
    this.filter = dict.filter;
    this.apply = dict.apply;
    this.clear = dict.clear;
    this.clearFilter = dict.clearFilter;
    this.detail = dict.detail;
    this.pinColumn = dict.pinColumn;
    this.unpinColumn = dict.unpinColumn;
  }
}
