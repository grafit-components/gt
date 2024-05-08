import { FilterState } from '../../itsk-grid/model/filter-state';
import { FilterColumn } from './filter-column';

export class ItskFilterHelper {
  static showFilter(filter: FilterColumn, state: FilterState, showActive: boolean): boolean {
    if (!showActive) {
      return true;
    }
    return (
      ItskFilterHelper.hasStringValue(filter, state) ||
      ItskFilterHelper.hasListValue(filter, state) ||
      ItskFilterHelper.hasNumericValue(filter, state) ||
      ItskFilterHelper.hasDateValue(filter, state)
    );
  }

  private static hasStringValue(filter: FilterColumn, state: FilterState): boolean {
    const found = state.stringFilters?.find((_) => _.fieldName === filter.filterField);
    if (found) {
      return found.value !== null && found.value !== undefined && found.value !== '';
    }
    return false;
  }

  private static hasListValue(filter: FilterColumn, state: FilterState): boolean {
    const found = state.listFilters?.find((_) => _.fieldName === filter.filterField);
    if (found) {
      return found.value !== null && found.value !== undefined && found.value.length > 0;
    }
    return false;
  }

  private static hasNumericValue(filter: FilterColumn, state: FilterState): boolean {
    const found = state.numericFilters?.find((_) => _.fieldName === filter.filterField);
    if (found) {
      return (
        found.value !== null &&
        found.value !== undefined &&
        ((found.value.equalsTo !== null && found.value.equalsTo !== undefined) ||
          (found.value.greaterThan !== null && found.value.greaterThan !== undefined) ||
          (found.value.lessThan !== null && found.value.lessThan !== undefined))
      );
    }
    return false;
  }

  private static hasDateValue(filter: FilterColumn, state: FilterState): boolean {
    const found = state.dateFilters?.find((_) => _.fieldName === filter.filterField);
    if (found) {
      return (
        found.value !== null &&
        found.value !== undefined &&
        ((found.value.greaterThan !== null && found.value.greaterThan !== undefined) ||
          (found.value.lessThan !== null && found.value.lessThan !== undefined))
      );
    }
    return false;
  }
}
