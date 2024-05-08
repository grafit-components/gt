import { EventEmitter } from '@angular/core';
import { FilterState } from '../../itsk-grid/model/filter-state';
import { FilterBase } from './filter-base';
import { FilterColumn } from './filter-column';

export abstract class FilterComponentBase {
  abstract column: FilterColumn;
  abstract state: FilterState;

  abstract filterChanged: EventEmitter<FilterBase>;
}
