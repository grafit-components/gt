import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';

export interface ICellCoordinates<T extends IId> {
  row: GridRow<T>;
  column: GridColumn;
}


export interface ICellEvent<T extends IId> extends ICellCoordinates<T> {
  event: Event;
}
