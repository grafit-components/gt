import {NumericFilter} from '../../itsk-filter/model/numeric-filter';
import {DateFilter} from '../../itsk-filter/model/date-filter';
import {StringFilter} from '../../itsk-filter/model/string-filter';
import {ListFilter} from '../../itsk-filter/model/list-filter';
import {SortParam} from '../../itsk-filter/model/sort-param';
import {DateFilterValue} from '../../itsk-filter/model/date-filter-value';
import {NumericFilterValue} from '../../itsk-filter/model/numeric-filter-value';
import {ListFilterType} from '../../itsk-filter/model/enum/list-filter-type.enum';

export class FilterState {
  stringFilters: StringFilter[] = [];
  numericFilters: NumericFilter[] = [];
  dateFilters: DateFilter[] = [];
  listFilters: ListFilter[] = [];
  sortParams: SortParam[] = [];

  constructor(options?: {
    stringFilters?: any[];
    numericFilters?: any[];
    dateFilters?: any[];
    listFilters?: any[];
    sortParams?: any[];
  }) {
    if (options) {
      if (options.stringFilters && options.stringFilters.length) {
        this.stringFilters = options.stringFilters.map((x: any) => {
          return new StringFilter(x);
        });
      }

      if (options.numericFilters && options.numericFilters.length) {
        this.numericFilters = options.numericFilters.map((x: any) => {
          return new NumericFilter(x);
        });
      }

      if (options.dateFilters && options.dateFilters.length) {
        this.dateFilters = options.dateFilters.map((x: any) => {
          return new DateFilter(x);
        });
      }

      if (options.listFilters && options.listFilters.length) {
        this.listFilters = options.listFilters.map((x: any) => {
          return new ListFilter(x);
        });
      }

      if (options.sortParams && options.sortParams.length) {
        this.sortParams = options.sortParams.map((x: any) => {
          return new SortParam(x);
        });
      }
    }
  }

  static restore(cookie: string): any {
    const state = localStorage.getItem(cookie) || 'null';
    return JSON.parse(state);
  }

  save(cookieName: string) {
    if (cookieName) {
      localStorage.setItem(cookieName, JSON.stringify(this));
    }
  }


  addListFilter(value: ListFilter): ListFilter {
    if (this.listFilters === null || this.listFilters === undefined) {
      this.listFilters = [];
    }
    const filter = this.listFilters.find((f) => {
      return f.fieldName === value.fieldName;
    });
    if (filter === null || filter === undefined) {
      this.listFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addDateFilter(value: DateFilter): DateFilter {
    if (this.dateFilters === null || this.dateFilters === undefined) {
      this.dateFilters = [];
    }
    const filter = this.dateFilters.find((f) => {
      return f.fieldName === value.fieldName;
    });
    if (filter === null || filter === undefined) {
      this.dateFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addStringFilter(value: StringFilter): StringFilter {
    if (this.stringFilters === null || this.stringFilters === undefined) {
      this.stringFilters = [];
    }
    const filter = this.stringFilters.find((f) => {
      return f.fieldName === value.fieldName;
    });
    if (filter === null || filter === undefined) {
      this.stringFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  addNumericFilter(value: NumericFilter): NumericFilter {
    if (this.numericFilters === null || this.numericFilters === undefined) {
      this.numericFilters = [];
    }
    const filter = this.numericFilters.find((f) => {
      return f.fieldName === value.fieldName;
    });
    if (filter === null || filter === undefined) {
      this.numericFilters.push(value);
      return value;
    } else {
      filter.value = value.value;
      return filter;
    }
  }

  clear() {
    this.sortParams.length = 0;

    this.stringFilters.map((f: StringFilter) => {
      f.value = '';
    });
    this.dateFilters.map((f: DateFilter) => {
      f.value = new DateFilterValue({
        lessThan: null,
        greaterThan: null
      });
    });
    this.numericFilters.map((f: NumericFilter) => {
      f.value = new NumericFilterValue({
        lessThan: null,
        greaterThan: null,
        equalsTo: null
      });
    });
    this.listFilters.map((f: ListFilter) => {
      f.value = [];
      f.type = ListFilterType.None;
    });
  }
}
