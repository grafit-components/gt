import { GridColumn } from './grid-column';
import { GridRow, IId } from './grid-row';

export abstract class DetailComponentBase<T extends IId> {
  abstract row: GridRow<T>;
  abstract columns: GridColumn[];
}
