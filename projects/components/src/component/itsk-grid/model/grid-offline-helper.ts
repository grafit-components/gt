import {FilterState} from './filter-state';
import {Paging} from '../../itsk-pager/model/paging';
import {StringFilter} from '../../itsk-filter/model/string-filter';
import {NumericFilter} from '../../itsk-filter/model/numeric-filter';
import {DateFilter} from '../../itsk-filter/model/date-filter';
import {ListFilter} from '../../itsk-filter/model/list-filter';
import {StringFilterType} from '../../itsk-filter/model/enum/string-filter-type.enum';
import {SortParam} from '../../itsk-filter/model/sort-param';
import {ListFilterType} from "../../itsk-filter/model/enum/list-filter-type.enum";

export class GridOfflineHelper<T> {
  static getData<T>(data: T[], state: FilterState, paging: Paging): T[] {
    let result: T[] = data;
    result = GridOfflineHelper.filterData(result, state);
    result = GridOfflineHelper.sortData(result, state);
    if (paging !== null && paging !== undefined) {
      result = GridOfflineHelper.getPage(result, paging);
    }
    return result;
  }

  static sortData<T>(data: T[], state: FilterState): T[] {
    let result: T[] = data;
    const func = (sortParam: SortParam) => {
      result = GridOfflineHelper.sort(result, sortParam);
    };
    if (state?.sortParams?.length > 0) {
      state.sortParams.forEach(func);
    }
    return result;
  }

  static filterData<T>(data: T[], state: FilterState): T[] {
    let result: T[] = data;
    if (state?.stringFilters?.length) {
      const stringFilter = (filter: StringFilter) => {
        result = GridOfflineHelper.filterString(result, filter);
      };
      state.stringFilters.forEach(stringFilter);
    }
    if (state?.dateFilters?.length) {
      const dateFilter = (filter: DateFilter) => {
        result = GridOfflineHelper.filterDate(result, filter);
      };
      state.dateFilters.forEach(dateFilter);
    }
    if (state?.numericFilters?.length) {
      const numericFilter = (filter: NumericFilter) => {
        result = GridOfflineHelper.filterNumber(result, filter);
      };
      state.numericFilters.forEach(numericFilter);
    }
    if (state?.listFilters?.length) {
      const listFilter = (filter: ListFilter) => {
        result = GridOfflineHelper.filterList(result, filter);
      };
      state.listFilters.forEach(listFilter);
    }
    return result;
  }

  static filterString<T>(data: T[], filter: StringFilter): T[] {
    if (filter.value === null || filter.value === undefined) {
      return data;
    }
    const filterString = (row: T) => {
      const item = row as any;
      if (filter.type === StringFilterType.EndsWith) {
        return item[filter.fieldName].toLowerCase().endsWith(filter.value.toLowerCase());
      }
      if (filter.type === StringFilterType.Equals) {
        return item[filter.fieldName.toLowerCase()] === filter.value.toLowerCase();
      }
      if (filter.type === StringFilterType.StartsWith) {
        return item[filter.fieldName.toLowerCase()].startsWith(filter.value.toLowerCase());
      }
      return item[filter.fieldName].toLowerCase().indexOf(filter.value.toLowerCase()) >= 0;
    };
    return data.filter(filterString);
  }

  static filterDate<T>(data: T[], filter: DateFilter): T[] {
    const filterDate = (row: T) => {
      const item = row as any;
      return (filter.value.lessThan === null || filter.value.lessThan === undefined
        ? true
        : filter.value.lessThan.getTime() > item[filter.fieldName].getTime()) &&
        (filter.value.greaterThan === null || filter.value.greaterThan === undefined
          ? true
          : filter.value.greaterThan.getTime() < item[filter.fieldName].getTime());
    };
    return data.filter(filterDate);
  }

  static filterNumber<T>(data: T[], filter: NumericFilter): T[] {
    const filterNumber = (row: T) => {
      const item = row as any;
      return (filter.value.lessThan === null || filter.value.lessThan === undefined
        ? true
        : filter.value.lessThan > item[filter.fieldName]) &&
        (filter.value.greaterThan === null || filter.value.greaterThan === undefined
          ? true
          : filter.value.greaterThan < item[filter.fieldName]) &&
        (filter.value.equalsTo === null || filter.value.equalsTo === undefined
          ? true
          : filter.value.equalsTo === item[filter.fieldName]);
    };
    return data.filter(filterNumber);
  }

  static filterList<T>(data: T[], filter: ListFilter): T[] {
    if (filter.value === null || filter.value === undefined || filter.value.length < 1) {
      return data;
    }
    const filterList = (row: T) => {
      const item = row as any;
      if (filter.type === ListFilterType.Excluded) {
        return filter.value.indexOf(item[filter.fieldName]) < 0;
      }
      return filter.value.indexOf(item[filter.fieldName]) >= 0;
    };
    return data.filter(filterList);
  }

  static sort<T>(data: T[], sortParam: SortParam): T[] {
    if(sortParam.field)
    return data.sort(sortParam.asc ? GridOfflineHelper.asc(sortParam.field) : GridOfflineHelper.desc(sortParam.field));
    return data
  }

  static desc(field: string) {
    const desc = (a: any, b: any) => {
      return a[field] > b[field] ? -1 : 1;
    };
    return desc;
  }

  static asc(field: string) {
    const asc = (a: any, b: any) => {
      return a[field] < b[field] ? -1 : 1;
    };
    return asc;
  }

  static getPage<T>(data: T[], paging: Paging): T[] {
    return data.slice(paging.page * paging.pageSize, (paging.page + 1) * paging.pageSize);
  }
}
