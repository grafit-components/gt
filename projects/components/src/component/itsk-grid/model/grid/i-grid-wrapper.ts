import {EventEmitter, Type} from '@angular/core';
import {DetailComponentBase} from '../detail-component-base';
import {IId} from '../grid-row';
import {IGrid} from './i-grid';

export interface IGridWrapper<T extends IId> extends IGrid<T> {
  showPager: boolean;
  showActionPanel: boolean;
  showFilterButton: boolean;
  showFilter: boolean;
  showFilterChange: EventEmitter<boolean>;
  showColumnsButton: boolean;
  showColumns: boolean;
  showColumnsChange: EventEmitter<boolean>;
  showDetailsButton: boolean;
  showDetails: boolean;
  showDetailsChange: EventEmitter<boolean>;
  showCustom: boolean;
  showCustomChange: EventEmitter<boolean>;
  detailComponent?: Type<DetailComponentBase<any>>;
}
