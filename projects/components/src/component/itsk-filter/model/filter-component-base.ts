import {EventEmitter} from '@angular/core';
import {FilterBase} from './filter-base';
import {FilterState} from '../../itsk-grid/model/filter-state';
import {FilterColumn} from './filter-column';

export abstract class FilterComponentBase {
  abstract column: FilterColumn;
  abstract state: FilterState;

  abstract filterChanged: EventEmitter<FilterBase>;
}
