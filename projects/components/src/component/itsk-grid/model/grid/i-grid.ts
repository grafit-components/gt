import { EventEmitter, Type } from '@angular/core';
import { BooleanFunc, BooleanPromiseFunc } from '../../../../util/object-util';
import { ItskGridSelectRowsByType } from '../../model/enum/itsk-grid-select-rows-by-type';
import { ItskGridSelectType } from '../../model/enum/itsk-grid-select-type';
import { AdditionalComponentBase } from '../additional-component-base';
import { AggregateComponentBase } from '../aggregate-component-base';
import { ICellCoordinates, ICellEvent } from '../cell-coordinates';
import { GroupingType } from '../enum/grouping-type.enum';
import { ItskGridEditEvent } from '../enum/itsk-grid-edit-event.enum';
import { ItskGridEditMode } from '../enum/itsk-grid-edit-mode.enum';
import { ItskGridEditType } from '../enum/itsk-grid-edit-type.enum';
import { FilterState } from '../filter-state';
import { GridColumn } from '../grid-column';
import { GridRow, IId } from '../grid-row';
import { GroupRowComponentBase } from '../group-row-component-base';

export interface IGrid<T extends IId> {
  columns?: GridColumn[];
  state?: FilterState;
  stateChange: EventEmitter<FilterState>;
  stateful: boolean;
  cookieName?: string;
  additionalComponent?: Type<AdditionalComponentBase<any>>;
  aggregateComponent?: Type<AggregateComponentBase<any>>;

  activeRow?: GridRow<T>;
  activeRowChange: EventEmitter<GridRow<T>>;

  selectedRows?: GridRow<T>[];
  selectedRowsChange: EventEmitter<GridRow<T>[]>;
  selectRowsBy: ItskGridSelectRowsByType;
  selectType: ItskGridSelectType;

  rowLeft: EventEmitter<GridRow<T>>;
  rowClick: EventEmitter<ICellCoordinates<T>>;
  rowDoubleClick: EventEmitter<ICellCoordinates<T>>;

  rowEditStart: EventEmitter<GridRow<T>>;

  rowEditEnd: EventEmitter<GridRow<T>>;

  cellClick: EventEmitter<ICellEvent<T>>;

  cellDoubleClick: EventEmitter<ICellEvent<T>>;

  cellFocus: EventEmitter<ICellEvent<T>>;

  cellEditStart: EventEmitter<ICellCoordinates<T>>;

  cellEditEnd: EventEmitter<ICellCoordinates<T>>;

  valueChange: EventEmitter<ICellCoordinates<T> | null>;

  cellKeyUp: EventEmitter<ICellEvent<T>>;

  rowSelectable: boolean | ((row: GridRow<T>) => boolean) | ((row: GridRow<T>) => Promise<boolean>);
  rowEditable: boolean | ((row: GridRow<T>) => boolean) | ((row: GridRow<T>) => Promise<boolean>);
  cellEditable: boolean | BooleanFunc<ICellCoordinates<T>> | BooleanPromiseFunc<ICellCoordinates<T>>;
  editType?: ItskGridEditType;
  editOn?: ItskGridEditEvent;
  editMode?: ItskGridEditMode;
  virtual: boolean;
  grouping: boolean;
  groupingType: GroupingType;
  openLevels?: number;
  groupRowComponent: Type<GroupRowComponentBase<T>>;
  tree: boolean;
}
