import {GridColumn} from './grid-column';

export class GridUtil {
  static flattenColumns(columns: GridColumn[]): GridColumn[] {
    const result: GridColumn[] = [];
    columns.forEach((column) => {
      if (column.columns !== null && column.columns !== undefined && column.columns.length > 0) {
        result.push(...GridUtil.flattenColumns(column.columns as any));
      } else {
        result.push(column);
      }
    });
    return result;
  }

  static initLockedColumns(columns: GridColumn[], locked: boolean): GridColumn[] {
    let result: GridColumn[] = [];
    if (columns !== null && columns !== undefined && columns.length > 0) {
      result = columns.filter((col) => {
        return col.locked === locked && !col.hidden;
      });
    }
    return result;
  }

}
