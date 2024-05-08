import { FilterColumn } from '../model/filter-column';

export class FilterGroupHelper {
  static isLeaf(filterColumn: FilterColumn) {
    return filterColumn.columns === null || filterColumn.columns === undefined || filterColumn.columns.length < 1;
  }

  static hasFilterableLeafs(filterColumn: FilterColumn) {
    const found = filterColumn.columns?.find((_) => _.filterable && FilterGroupHelper.isLeaf(_));
    if (found) {
      return true;
    } else {
      for (let i = 0, l = filterColumn.columns?.length; i < l; i++) {
        const sub = this.hasFilterableLeafs(filterColumn.columns[i]);
        if (sub) {
          return true;
        }
      }
    }
    return false;
  }
}
