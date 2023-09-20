import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';

export abstract class DetailComponentBase<T extends IId> {
  abstract row: GridRow<T>;
  abstract columns: GridColumn[];
}
