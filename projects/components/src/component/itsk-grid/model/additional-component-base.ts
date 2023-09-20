import {GridRow, IId} from './grid-row';
import {GridColumn} from './grid-column';

export abstract class AdditionalComponentBase<T extends IId> {
  abstract locked: boolean;
  abstract row: GridRow<T>;
  abstract columns: GridColumn[];
}
