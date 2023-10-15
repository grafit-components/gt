import {GridColumn} from './grid-column';

export class ColumnResizeEvent {
  column: GridColumn;
  resize: number;
  originalWidth: number;

  constructor(column: GridColumn, originalWidth: number, resize: number) {
    this.column = column;
    this.originalWidth = originalWidth;
    this.resize = resize;
  }
}
