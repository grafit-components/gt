import { GridColumn } from './grid-column';

export class GridSortEvent {
  column: GridColumn;
  shiftKey: boolean;

  constructor(column: GridColumn, shiftKey: boolean) {
    this.column = column;
    this.shiftKey = shiftKey;
  }
}
