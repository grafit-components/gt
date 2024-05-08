import { GridColumn } from './grid-column';
import { GridRow, IId } from './grid-row';

export abstract class AdditionalComponentBase<T extends IId> {
  abstract locked: boolean;
  abstract row: GridRow<T>;
  abstract columns: GridColumn[];
}
