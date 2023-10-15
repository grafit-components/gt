import {GridColumn} from './grid-column';

export class ColumnReorderEvent {
  source: GridColumn;
  target: GridColumn;

  constructor(source: GridColumn, target: GridColumn) {
    this.source = source;
    this.target = target;
  }
}
